import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import GeneralTab from "./GeneralTab";
import BillingsTab from "./BillingsTab";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const navigate = useNavigate();
  return (
    <>
      <div className="p-6 max-w-7xl mx-auto pt-28 dark:bg-gray-900 pb-10">
        <div className="flex items-center mb-4">
          <FaArrowLeft className="mr-2" onClick={() => navigate("/user/list-service")} />
          <h1 className="text-2xl font-bold dark:text-white">Settings</h1>
        </div>
        <div className=" md:flex md:gap-6 mt-6 ">
          <div className="w-full md:w-1/3 min-h-50 ">
            <ProfileCard  />
          </div>
          <div className="w-full md:w-2/3 mt-5 md:mt-0 shadow rounded-lg p-4 bg-white min-h-125 dark:bg-gray-800">
            <div className="border-b border-gray-300 flex gap-4 mb-4">
              <button
                onClick={() => setActiveTab("general")}
                className={`pb-2 ${
                  activeTab === "general"
                    ? "border-b-2 border-blue-500 text-blue-500 dark:text-white"
                    : "text-gray-500"
                }`}
              >
                General
              </button>
              <button
                onClick={() => setActiveTab("billings")}
                className={`pb-2 ${
                  activeTab === "billings"
                    ? "border-b-2 border-blue-500 text-blue-500 dark:text-white"
                    : "text-gray-500"
                }`}
              >
                Billings
              </button>
            </div>
            {activeTab === "general" ? <GeneralTab /> : <BillingsTab />}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettings;
