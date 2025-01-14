import React, { ReactNode } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import SuccessAlerts from "../components/Alerts/SuccessAlerts";
import FailedAlerts from "../components/Alerts/FailedAlerts";
import WarningAlerts from "../components/Alerts/WarningAlerts";

const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { alertMessage, alertType } = useNotificationContext();
  return (
    <div className="relative">
      {alertType === "success" && alertMessage && (
        <SuccessAlerts tittle="Success" message={alertMessage} />
      )}
      {alertType === "error" && alertMessage && (
        <FailedAlerts tittle="Error" message={alertMessage} />
      )}
      {alertType === "warning" && alertMessage && (
        <WarningAlerts tittle="Warning" message={alertMessage} />
      )}
      <main>
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
};

export default AuthLayout;
