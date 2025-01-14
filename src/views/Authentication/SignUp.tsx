import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoDark from "../../assets/images/logo/logo-dark.png";
import Logo from "../../assets/images/logo/logo-icon.png";
import TextField from "../../components/Forms/TextField/TextField";
import { useAuth } from "../../hooks/useAuth";
import SelectLocation from "../../components/Forms/SelectGroup/SelectLocation";
import { LuLockKeyhole } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import SuccessAlerts from "../../components/Alerts/SuccessAlerts";
import WarningAlerts from "../../components/Alerts/WarningAlerts";
import FailedAlerts from "../../components/Alerts/FailedAlerts";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    role: "user",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });

  const [currentTab, setCurrentTab] = useState(1);
  const { register, loading, error, success } = useAuth();

  const validateTab1 = () => {
    const tempErrors = { ...errors };
    let isValid = true;

    if (formData.name === "") {
      tempErrors.name = "Name is required";
      isValid = false;
    } else {
      tempErrors.name = "";
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (formData.email === "" || !emailPattern.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      tempErrors.email = "";
    }

    if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    } else {
      tempErrors.password = "";
    }

    if (formData.confirmPassword !== formData.password) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else {
      tempErrors.confirmPassword = "";
    }

    setErrors(tempErrors);
    return isValid;
  };

  const validateTab2 = () => {
    const tempErrors = { ...errors };
    let isValid = true;

    if (formData.phoneNumber === "") {
      tempErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else {
      tempErrors.phoneNumber = "";
    }

    if (formData.address === "") {
      tempErrors.address = "Address is required";
      isValid = false;
    } else {
      tempErrors.address = "";
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentTab === 1 && validateTab1()) {
      setCurrentTab(2);
    }
  };

  const handleBack = () => {
    setCurrentTab(1);
  };

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<
    "success" | "error" | "warning" | null
  >(null);

  const showAlert = (
    message: string,
    type: "success" | "error" | "warning"
  ) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage(null);
      setAlertType(null);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTab === 2 && validateTab2()) {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phoneNumber,
        address: formData.address,
        role: formData.role,
      });
      if (loading) {
        showAlert("Registering, please wait...", "warning");
      } else if (success) {
        showAlert(success, "success");
      } else if (error) {
        showAlert(error, "error");
      } else {
        showAlert("An unknown error occurred.", "error");
      }
    }
  };

  const handleLocationChange = (location: string) => {
    setFormData((prevData) => ({
      ...prevData,
      address: location,
    }));
  };

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

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full md:block md:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>
              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>
            </div>
          </div>

          <div className="w-full flex items-center border-stroke dark:border-strokedark md:w-1/2 min-h-screen md:border-l-2">
            <div className="w-full p-4 sm:p-6.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to SkillBridge
              </h2>

              <form onSubmit={handleSubmit}>
                {currentTab === 1 && (
                  <div>
                    <div className="mb-4">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Name
                      </label>
                      <div className="relative">
                        <TextField
                          type="text"
                          placeholder="Enter your name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <span className="absolute right-4 top-4">
                          <FaUser />
                        </span>
                        {errors.name && (
                          <span className="text-red-500">{errors.name}</span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Email
                      </label>
                      <div className="relative">
                        <TextField
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <span className="absolute right-4 top-4">
                          <MdOutlineEmail size={24} />
                        </span>
                        {errors.email && (
                          <span className="text-red-500">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Password
                      </label>
                      <div className="relative">
                        <TextField
                          type="password"
                          placeholder="Enter your password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <span className="absolute right-4 top-4">
                          <LuLockKeyhole size={24} />
                        </span>
                        {errors.password && (
                          <span className="text-red-500">
                            {errors.password}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Re-type Password
                      </label>
                      <div className="relative">
                        <TextField
                          type="password"
                          placeholder="Re-type your password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        <span className="absolute right-4 top-4">
                          <LuLockKeyhole size={24} />
                        </span>
                        {errors.confirmPassword && (
                          <span className="text-red-500">
                            {errors.confirmPassword}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full rounded-lg bg-blue-500 py-3 text-white hover:bg-blue-600"
                    >
                      Next
                    </button>
                  </div>
                )}

                {currentTab === 2 && (
                  <>
                    <div className="mb-4">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Phone Number
                      </label>
                      <div className="relative">
                        <TextField
                          type="number"
                          placeholder="Enter your phone number"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                        <span className="absolute right-4 top-4">
                          <FaPhoneFlip />
                        </span>
                        {errors.phoneNumber && (
                          <span className="text-red-500">
                            {errors.phoneNumber}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <SelectLocation onLocationChange={handleLocationChange} />
                      {errors.address && (
                        <span className="text-red-500">{errors.address}</span>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="rounded-lg bg-gray-500 py-3 px-6 text-white hover:bg-gray-600"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        className="rounded-lg bg-blue-500 py-3 px-6 text-white hover:bg-blue-600"
                      >
                        {loading ? "Submitting..." : "Sign Up"}
                      </button>
                    </div>
                  </>
                )}
              </form>
              <div className="mt-4 text-center">
                <p>
                  Have any account?{" "}
                  <Link to="/auth/signin" className="text-primary">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
