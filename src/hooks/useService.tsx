import { useState } from "react";
import {
  getAllServices,
  getDetailService,
  createService,
  updateService,
  deleteService,
} from "../services/services";
import { Service } from "../models/Service";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useService = () => {
  const [services, setService] = useState<Service[]>([]);
  const [detailService, setDetailService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const getAllService = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllServices();
      if (response?.data) {
        setService(response.data);
        setSuccess("Services fetched successfully.");
      } else {
        console.error("No service data available.");
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || "Failed to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  const getServiceDetail = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDetailService(id);
      if (response?.data) {
        setDetailService(response.data);
        setSuccess("Service detail fetched successfully.");
      } else {
        console.error("No service detail available.");
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(
        apiError.response?.data?.message || "Failed to fetch service detail."
      );
    } finally {
      setLoading(false);
    }
  };

  const createNewService = async (data: Partial<Service>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createService(data);
      if (response?.data) {
        setSuccess("Service created successfully.");
        getAllService();
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || "Failed to create service.");
    } finally {
      setLoading(false);
    }
  };

  const updateExistingService = async (id: number, data: Partial<Service>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateService(id, data);
      if (response?.data) {
        setSuccess("Service updated successfully.");
        getAllService();
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || "Failed to update service.");
    } finally {
      setLoading(false);
    }
  };

  const removeService = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteService(id);
      setSuccess("Service deleted successfully.");
      getAllService();
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || "Failed to delete service.");
    } finally {
      setLoading(false);
    }
  };

  return {
    services,
    detailService,
    loading,
    error,
    success,
    getAllService,
    getServiceDetail,
    createNewService,
    updateExistingService,
    removeService,
  };
};
