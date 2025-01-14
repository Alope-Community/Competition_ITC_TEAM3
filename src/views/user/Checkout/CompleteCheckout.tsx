import React from "react";
import SuccessPayment from "../../../assets/images/transaction/success_payment.svg";
import { Service } from "../../../models/Service";
import { User } from "../../../models/user";
import { TransactionResult } from "../../../services/paymentService";

interface CompleteStepProps {
  detailService: Service;
  user: User;
  result: TransactionResult;
  selectedDate: string;
  totalPrice: number;
  order_id: string;
}

const CompleteStep: React.FC<CompleteStepProps> = ({
  user,
  detailService,
  result,
  selectedDate,
  totalPrice,
  order_id,
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-left mb-8">
          <img
            src={SuccessPayment}
            alt="Purchase Illustration"
            className="mx-auto"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            Thank you for your purchase! 🎉
          </h1>
        </div>

        <div className="p-6 w-full">
          <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
            <div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-500">📅</span>
                <p className="font-medium text-gray-700">Date</p>
              </div>
              <p className="text-gray-600">
                {new Date(selectedDate).toLocaleDateString("id-ID")}
              </p>
            </div>
            <div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-500">👤</span>
                <p className="font-medium text-gray-700">Customer</p>
              </div>
              <p className="text-gray-600">{user.name}</p>
            </div>
            <div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-500">💳</span>
                <p className="font-medium text-gray-700">Payment Method</p>
              </div>
              <p className="text-gray-600">{result.payment_type}</p>
            </div>
            <div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-500">🔢</span>
                <p className="font-medium text-gray-700 md:text-nowrap">
                  Order Number
                </p>
              </div>
              <p className="text-gray-600 md:text-nowrap">{order_id}</p>
            </div>
            <div className="col-span-2">
              <div className="flex items-start gap-2">
                <span className="text-indigo-500">💵</span>
                <p className="font-medium text-gray-700">Total</p>
              </div>
              <p className="text-xl font-bold text-gray-800">{totalPrice}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <a
            href={`https://wa.me/${detailService.user.phone_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white py-2 px-6 rounded-lg"
          >
            Go To Whatsapp
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompleteStep;
