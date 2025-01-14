import React, { useEffect, useState } from "react";
import ConfirmStep from "./ConfirmCheckout";
import CompleteStep from "./CompleteCheckout";
import SummaryStep from "./SummaryCheckout";
import { useLocation } from "react-router-dom";
import { useService } from "../../../hooks/useService";
import { Service } from "../../../models/Service";
import { useAuth } from "../../../hooks/useAuth";
import { usePayment } from "../../../hooks/usePayment";
import { User } from "../../../models/user";
import { useNotificationContext } from "../../../context/NotificationContext";
import { TransactionResult } from "../../../services/paymentService";

const steps = ["Summary", "Confirm", "Complete"];

const Checkout: React.FC = () => {
  const { showAlert } = useNotificationContext();
  const location = useLocation();
  const { serviceId, selectedDate } = location.state || {};
  const {
    getServiceDetail,
    detailService,
    loading: serviceLoading,
  } = useService();
  const { user, getUserData, loading: userLoading, setUser } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const {
    isPaid,
    fetchSnapToken,
    setUserId,
    result,
    setServiceId,
    error,
    success,
    setOrderDate,
  } = usePayment();
  const [orderId, setOrderId] = useState<string>("");

  const isLoading = serviceLoading || userLoading;

  const goToNextStep = () => {
    if (currentStep === 1 && !isPaid) {
      showAlert("Please complete the payment before proceeding.", "warning");
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    getServiceDetail(serviceId);
    getUserData();
    const generatedOrderId = `ORDER-SKB-${Date.now()}`;
    setOrderId(generatedOrderId);
  }, []);

  useEffect(() => {
    setUser(user);
    const price = Number(detailService?.price);
    const calculatedFee = price * 0.01;
    setServiceFee(calculatedFee);
    setTotalPrice(price + calculatedFee);
    if (user) {
      setUserId(user.id);
    }
    setServiceId(serviceId);
    setOrderDate(new Date(selectedDate).toLocaleDateString("id-ID"));

    if (error) {
      showAlert(error, "error");
    }

    if (success) {
      showAlert(success, "success");
    }
  }, [detailService, error, success]);

  const handlePayment = () => {
    if (!user?.id) {
      showAlert("User ID is missing. Please log in first.", "error");
      return;
    }
    if (!serviceId) {
      showAlert("Service ID is missing. Please select a service.", "error");
      return;
    }

    if (detailService) {
      const itemDetails = [
        {
          id: `SKB-Service-${detailService.id}`,
          price: totalPrice - serviceFee,
          quantity: 1,
          name: detailService.title || "Unknown Service",
        },
        {
          id: "SKB-Service-Fee",
          price: serviceFee,
          quantity: 1,
          name: "Service Fee",
        },
      ];

      const calculatedGrossAmount = itemDetails.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      fetchSnapToken({
        gross_amount: calculatedGrossAmount,
        full_name: user.name,
        email: user.email,
        order_id: orderId,
        item_details: itemDetails,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-15 md:mt-20">
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 text-center">
            <div
              className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full ${
                index <= currentStep
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </div>
            <p
              className={`mt-2 text-sm ${
                index === currentStep ? "font-bold" : ""
              }`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>

      <div className="border rounded-lg shadow-md bg-white">
        {currentStep === 0 && (
          <SummaryStep
            selectedDate={selectedDate}
            totalPrice={totalPrice}
            fee={serviceFee}
            detailService={detailService || ({} as Service)}
          />
        )}
        {currentStep === 1 && user && (
          <ConfirmStep
            selectedDate={selectedDate}
            servicePrice={Number(detailService?.price)}
            totalPrice={totalPrice}
            fee={serviceFee}
            user={user}
            detailService={detailService || ({} as Service)}
            handlePayment={handlePayment}
            order_id={orderId}
          />
        )}
        {currentStep === 2 && (
          <CompleteStep
            user={user || ({} as User)}
            detailService={detailService || ({} as Service)}
            result={result || ({} as TransactionResult)}
            selectedDate={selectedDate}
            order_id={orderId}
            totalPrice={totalPrice}
          />
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          disabled={currentStep === 0}
          onClick={goToPreviousStep}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Back
        </button>
        {currentStep < steps.length - 1 ? (
          <button
            onClick={goToNextStep}
            disabled={currentStep === 1 && !isPaid}
            className={`px-4 py-2 ${
              currentStep === 1 && !isPaid
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } rounded-md`}
          >
            Next
          </button>
        ) : (
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
