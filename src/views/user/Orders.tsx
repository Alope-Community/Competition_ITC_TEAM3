import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const orderItems = [
    {
      title: "Guitar Tuning",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, voluptas.",
      price: "Rp45.000",
      image: "img/card-1.png",
    },
    {
      title: "Resume Writing",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, voluptas.",
      price: "Rp60.000",
      image: "/img/background.png",
    },
    {
      title: "Carpentry Work",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, voluptas.",
      price: "Rp100.000",
      image: "img/card-1.png",
    },
    // Tambahkan item lainnya jika diperlukan...
  ];

  return (
    <>
      <div className="flex justify-center bg-slate-100 items-center px-4 py-6 dark:bg-gray-900">
        <div className="mt-4 p-6 rounded-lg lg:mt-24 lg:mb-10 shadow-md max-w-4xl w-full bg-white dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center mb-6">
            <FaArrowLeft className="mr-2 text-blue-700" onClick={() => navigate("/user/list-service")}  />
            <h1 className="text-xl font-bold text-zinc-800 dark:text-white">Your Orders</h1>
          </div>

          {/* Order Cards */}
          <div className="space-y-6">
            {orderItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row w-full bg-white shadow-lg rounded-lg overflow-hidden dark:bg-boxdark"
              >
                {/* Image Section */}
                <div className="w-full sm:w-1/3">
                  <img
                    src={item.image}
                    alt="Order Image"
                    className="w-full h-48 sm:h-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="w-full sm:w-2/3 bg-gray-100 text-zinc-950 p-4 flex flex-col justify-between dark:bg-boxdark">
                  <div>
                    <p className="text-sm text-blue-600 font-medium dark:text-white">In Progress</p>
                    <h3 className="text-lg md:text-xl font-semibold mt-2 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm mt-2 text-gray-700 dark:text-white">{item.description}</p>
                    <p className="text-base md:text-lg font-bold mt-4 dark:text-white">
                      {item.price}
                    </p>
                  </div>
                  <button className="mt-4 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
