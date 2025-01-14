import React, { createContext, useContext, useState, useCallback } from "react";

type AlertType = "success" | "error" | "warning" | null;

interface NotificationContextType {
  alertMessage: string | null;
  alertType: AlertType;
  showAlert: (message: string, type: AlertType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<AlertType>(null);

  const showAlert = useCallback((message: string, type: AlertType) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage(null);
      setAlertType(null);
    }, 3000); // Notifikasi hilang setelah 3 detik
  }, []);

  return (
    <NotificationContext.Provider
      value={{ alertMessage, alertType, showAlert }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
