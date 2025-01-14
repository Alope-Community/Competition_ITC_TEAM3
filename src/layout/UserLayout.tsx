import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SuccessAlerts from "../components/Alerts/SuccessAlerts";
import FailedAlerts from "../components/Alerts/FailedAlerts";
import WarningAlerts from "../components/Alerts/WarningAlerts";
import { useNotificationContext } from "../context/NotificationContext";

const UserLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { alertMessage, alertType } = useNotificationContext();

  return (
    <div className="relative">
      <Navbar />
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
      <Footer />
    </div>
  );
};

export default UserLayout;
