import axiosInstance from "../utils/axios";

export interface ItemDetail {
  id: string;
  price: number;
  quantity: number;
  name: string;
}

export interface PaymentData {
  gross_amount: number;
  full_name: string;
  email: string;
  order_id: string;
  item_details: ItemDetail[];
}

export interface SnapTokenResponse {
  snapToken: string;
  order_id: string;
}

export interface PaymentResult {
  success: {
    message: string;
    payment_id: number;
    order_id: number;
  };
}

export interface TransactionResult {
  order_id: string;
  transaction_status: string;
  payment_type: string;
  gross_amount: string;
  va_bank: string;
  va_number: string;
  fraud_status: string;
  transaction_time: string;
  user_id: number;
  service_id: number;
  order_date: string;
}

export const getSnapToken = async (
  data: PaymentData
): Promise<SnapTokenResponse> => {
  const response = await axiosInstance.post<SnapTokenResponse>(
    "/users/payment/token",
    data
  );
  return response.data;
};

export const sendTransactionResult = async (
  transaction: TransactionResult
): Promise<PaymentResult> => {
  try {
    const response = await axiosInstance.post<PaymentResult>(
      "/users/payment/result",
      transaction
    );

    console.log("Parsed PaymentResult:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error in sendTransactionResult:", err);
    throw err;
  }
};
