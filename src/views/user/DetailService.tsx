import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import TextField from "../../components/Forms/TextField/TextField";
import TextArea from "../../components/Forms/TextArea/TextArea";
import DatePickerOne from "../../components/Forms/DatePicker/DatePickerOne";
import { useServiceContext } from "../../context/ServiceContext";
import { useNotificationContext } from "../../context/NotificationContext";

const DetailService: React.FC = () => {
  const { showAlert } = useNotificationContext();
  const { id } = useParams<{ id: string }>();
  const { detailService, getServiceDetail, loading, error } =
    useServiceContext();
  const navigate = useNavigate();

  const numericId = Number(id);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  React.useEffect(() => {
    getServiceDetail(numericId);
  }, []);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        showAlert(
          "Selected date has already passed. Please choose a valid date.",
          "error"
        );
        setSelectedDate(null);
        return;
      }
      const formattedDate = date.toISOString();
      setSelectedDate(formattedDate);
      console.log("Selected date:", formattedDate);
    } else {
      setSelectedDate(null);
      console.log("No date selected");
    }
  };

  const handleCheckout = () => {
    if (selectedDate) {
      navigate(`/user/checkout`, {
        state: {
          serviceId: numericId,
          selectedDate,
        },
      });
    } else {
      showAlert(
        "Please select a date before proceeding to checkout.",
        "warning"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-black">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!detailService) {
    return <div>No service found</div>;
  }

  return (
    <div className="md:flex py-10 bg-gray-100 gap-6 p-6 mt-15">
      <div className="w-full md:w-2/3 max-w-6xl bg-white rounded-lg p-6 md:flex gap-6 border border-gray-200">
        <div className="md:w-1/6">
          <div className="flex items-center mb-4">
            <FaArrowLeft className="mr-2" />
            <h1 className="text-2xl font-bold">Detail</h1>
          </div>
        </div>
        <div className="md:w-5/6">
          <img
            src={
              detailService.image_url_full ||
              "https://via.placeholder.com/800x400"
            }
            alt="Service"
            className="w-full h-auto max-h-100 object-cover rounded-lg"
          />
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Nama Jasa</h2>
            <TextField type="text" value={detailService.title} readOnly />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Nama Penyedia</h3>
            <TextField
              type="text"
              value={detailService.user.name || "N/A"}
              readOnly
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Category</h3>
            <TextField
              type="text"
              value={detailService.category?.name || "N/A"}
              readOnly
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Location</h3>
            <TextField
              type="text"
              value={detailService.user?.address || "N/A"}
              readOnly
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Description</h3>
            <TextArea
              rows={6}
              value={detailService.description || "No description available."}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="md:w-1/3 p-4 bg-white border border-gray-200 rounded-lg mt-4 md:mt-0">
        <h2 className="text-lg font-semibold">Harga</h2>
        <p className="text-xl font-bold text-gray-800">
          Rp{" "}
          {detailService.price ? detailService.price.toLocaleString() : "N/A"}
        </p>
        <div className="w-full text-primary py-2 flex items-center">
          Book Now
        </div>
        <DatePickerOne onChange={handleDateChange} />
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-5"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default DetailService;
