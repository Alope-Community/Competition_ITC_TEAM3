import { useState, useCallback } from "react";

type AlertType = "success" | "error" | "warning" | null;

export const useNotification = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<AlertType>(null);

  const showAlert = useCallback((message: string, type: AlertType) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage(null);
      setAlertType(null);
    }, 3000);
  }, []);

  return {
    alertMessage,
    alertType,
    showAlert,
  };
};
