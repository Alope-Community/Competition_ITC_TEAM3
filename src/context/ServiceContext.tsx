import { createContext, useContext } from "react";
import { Service } from "../models/Service";

interface ServiceContextType {
  services: Service[];
  detailService: Service | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  getAllService: () => Promise<void>;
  getServiceDetail: (id: number) => Promise<void>;
  createNewService: (data: FormData) => Promise<void>;
  updateExistingService: (data: Partial<Service>) => Promise<void>;
  removeService: (id: number) => Promise<void>;
}

export const ServiceContext = createContext<ServiceContextType | null>(null);

export const useServiceContext = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
};
