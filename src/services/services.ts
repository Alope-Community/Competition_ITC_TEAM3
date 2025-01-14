import { Service } from "../models/Service";
import axiosInstance from "../utils/axios";

interface AllService {
  data: Service[];
}

interface DetailService {
  data: Service;
}

export const getAllServices = async (): Promise<AllService> => {
  const response = await axiosInstance.get<AllService>("/service");
  return response.data;
};

export const getDetailService = async (id: number): Promise<DetailService> => {
  const response = await axiosInstance.get<DetailService>(`/service/${id}`);
  return response.data;
};

export const createService = async (data: FormData): Promise<DetailService> => {
  const response = await axiosInstance.post<DetailService>(
    "/users/services",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  console.log(response);
  return response.data;
};

export const updateService = async (
  id: number,
  data: Partial<Service>
): Promise<DetailService> => {
  const response = await axiosInstance.put<DetailService>(
    `/service/${id}`,
    data
  );
  return response.data;
};

export const deleteService = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/service/${id}`);
};
