import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import TextField from "../../components/Forms/TextField/TextField";
import TextArea from "../../components/Forms/TextArea/TextArea";
import { useService } from "../../hooks/useService";
import DatePickerOne from "../../components/Forms/DatePicker/DatePickerOne";
import Footer from "../../components/Footer";

const DetailService: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { detailService, loading, error, getServiceDetail } = useService();
  const navigate = useNavigate();

  const numericId = Number(id);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString();
      setSelectedDate(formattedDate);
      console.log("Selected date:", formattedDate);
    } else {
      setSelectedDate(null);
      console.log("No date selected");
    }
  };

  useEffect(() => {
    if (id) {
      getServiceDetail(numericId);
    }
  }, [id]);

  const handleCheckout = () => {
    if (selectedDate) {
      navigate(`/user/checkout`, {
        state: {
          serviceId: numericId,
          selectedDate,
        },
      });
    } else {
      alert("Please select a date before proceeding to checkout.");
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
    <>
      <div className="md:flex py-10 gap-6 p-6 pt-28 dark:bg-gray-900">
        <div className="w-full md:w-2/3 max-w-6xl bg-white rounded-lg p-6 md:flex gap-6 shadow-lg dark:bg-gray-800">
          <div className="md:w-1/6">
            <div className="flex items-center mb-4">
              <FaArrowLeft
                className="mr-2"
                onClick={() => navigate("/user/list-service")}
              />
              <h1 className="text-2xl font-bold dark:text-white">Detail</h1>
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
              <h2 className="text-xl font-semibold dark:text-white">
                Nama Jasa
              </h2>
              <TextField type="text" value={detailService.title} readOnly />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium dark:text-white">
                Nama Penyedia
              </h3>
              <TextField
                type="text"
                value={detailService.user?.name || "N/A"}
                readOnly
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium dark:text-white">Category</h3>
              <TextField
                type="text"
                value={detailService.category?.name || "N/A"}
                readOnly
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium dark:text-white">Location</h3>
              <TextField
                type="text"
                value={detailService.user?.address || "N/A"}
                readOnly
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium dark:text-white">
                Description
              </h3>
              <TextArea
                rows={6}
                value={detailService.description || "No description available."}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/3 p-4 bg-white shadow-lg rounded-lg mt-4 md:mt-0 dark:bg-gray-800">
          <h2 className="text-lg font-semibold dark:text-white">Harga</h2>
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            Rp{" "}
            {detailService.price ? detailService.price.toLocaleString() : "N/A"}
          </p>
          {/* <div className="w-full text-primary py-2 flex items-center">
            Book Now
          </div> */}
          <DatePickerOne onChange={handleDateChange} />
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-5"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailService;
