import React from "react";
import { User } from "../../../models/user";
import OnPayment from "../../../assets/images/transaction/on_payment.svg";
import { Service } from "../../../models/Service";
import { usePayment } from "../../../hooks/usePayment";

interface ConfirmStepProps {
  selectedDate: string;
  totalPrice: number;
  servicePrice: number;
  fee: number;
  user: User;
  detailService: Service;
  handlePayment: () => void;
  order_id: string;
}

const ConfirmStep: React.FC<ConfirmStepProps> = ({
  selectedDate,
  totalPrice,
  fee,
  user,
  handlePayment,
  order_id,
  servicePrice,
}) => {
  const { loading } = usePayment();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 dark:bg-boxdark">
      <div className="text-center mb-8">
        <img src={OnPayment} alt="Purchase Illustration" className="mx-auto" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pay Now</h1>
        <p className="text-gray-500 dark:text-white">
          You can choose all method payment with midtrans
        </p>
      </div>
      <div className="p-6 w-full max-w-lg">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-b pb-4 mb-4">
          <div className="text-left">
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">👤</span>
              <p className="font-medium text-gray-700 dark:text-white">Buyer</p>
            </div>
            <p className="text-gray-600 dark:text-white">{user.name}</p>
          </div>
          <div className="text-left">
            <div className="flex items-start gap-2">
              <span className="text-purple-500">👤</span>
              <p className="font-medium text-gray-700 dark:text-white">Customer</p>
            </div>
            <p className="text-gray-600 dark:text-white">{user?.name}</p>
          </div>
          <div className="text-left">
            <div className="flex items-start gap-2">
              <span className="text-indigo-500">📅</span>
              <p className="font-medium text-gray-700 dark:text-white">Date</p>
            </div>
            <p className="text-gray-600 dark:text-white
            ">
              {new Date(selectedDate).toLocaleDateString("id-ID")}
            </p>
          </div>
          <div className="text-left">
            <div className="flex items-start gap-2">
              <span className="text-blue-500">🔢</span>
              <p className="font-medium text-gray-700 dark:text-white">Order ID</p>
            </div>
            <p className="text-gray-600 text-nowrap dark:text-white">{order_id}</p>
          </div>
          <div className="text-left">
            <div className="flex items-start gap-2">
              <span className="text-blue-500 dark:text-white">💵</span>
              <p className="font-medium text-gray-700 dark:text-white">Fee</p>
            </div>
            <p className="text-gray-600 dark:text-white">{fee}</p>
          </div>
          <div className="text-left">
            <div className="flex items-start gap-2">
              <span className="text-green-500">💵</span>
              <p className="font-medium text-gray-700 dark:text-white">Service Price</p>
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white">Rp {servicePrice}</p>
          </div>
          <div className="text-left">
            <div className="flex items-start gap-2">
              <span className="text-green-500">💵</span>
              <p className="font-medium text-gray-700 dark:text-white">Total Price</p>
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white">Rp {totalPrice}</p>
          </div>
        </div>
      </div>

      <button
        className="bg-primary text-white py-2 px-6 rounded-lg"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default ConfirmStep;
