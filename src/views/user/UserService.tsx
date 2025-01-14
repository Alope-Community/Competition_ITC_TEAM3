import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom

// Definisikan tipe data Service
type Service = {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
};

const UserService = () => {
  const [services, setServices] = useState<Service[]>([]); // State untuk menyimpan layanan
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState<string | null>(null); // State untuk error
  const navigate = useNavigate();

  // Fungsi untuk mengambil data services
  const fetchServices = async () => {
    setLoading(true); // Set status loading
    setError(null); // Reset error sebelumnya

    try {
      const token = localStorage.getItem("access_token"); // Ambil token dari localStorage

      if (!token) {
        throw new Error("Access token not found. Please log in.");
      }

      // Permintaan API
      const response = await axios.get<Service[]>(
        `http://127.0.0.1:8000/api/users/services/`,
        {
          headers: {
            Authorization: `${token}`, // Pastikan format token sesuai
          },
        }
      );

      setServices(response.data); // Simpan data ke state
    } catch (error: any) {
      console.error("Error fetching services:", error);
      setError(
        error.response?.data?.errors?.message?.[0] ||
          "Failed to fetch services. Please try again later."
      );
    } finally {
      setLoading(false); // Hentikan status loading setelah data diambil
    }
  };

  // Fungsi untuk menghapus layanan
  const deleteService = async (id: number) => {
    const token = localStorage.getItem("access_token"); // Ambil token dari localStorage

    if (!token) {
      alert("Access token not found. Please log in.");
      return;
    }

    try {
      // Permintaan API untuk menghapus layanan
      await axios.delete(`http://127.0.0.1:8000/api/users/services/`, {
        headers: {
          Authorization: `${token}`,
        },
        data: {
          id: id,
        },
      });

      // Setelah berhasil, ambil ulang daftar layanan
      fetchServices();
    } catch (error: any) {
      console.error("Error deleting service:", error);
      setError(
        error.response?.data?.errors?.message?.[0] ||
          "Failed to delete service. Please try again later."
      );
    }
  };

  // useEffect untuk menjalankan fetchServices saat komponen dimount
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    
    <>
      <div className="flex justify-center bg-slate-100 items-center px-4 py-6 dark:bg-gray-900">
        <div className="mt-4 p-6 rounded-lg lg:mt-24 lg:mb-10 shadow-md max-w-4xl w-full bg-white dark:bg-gray-800">
          <div className="flex items-center mb-6">
            <FaArrowLeft className="mr-2 text-blue-700" onClick={() => navigate("/user/list-service")} />
            <h1 className="text-xl font-bold text-zinc-800 dark:text-white">Your Services</h1>
          </div>

          {/* Tampilkan loading jika data belum diambil */}
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : services.length > 0 ? (
            <div className="space-y-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col sm:flex-row w-full bg-white shadow-md rounded-lg overflow-hidden dark:bg-boxdark"
                >
                  {/* Bagian Gambar */}
                  <div className="w-full sm:w-1/3">
                    <img
                      src={service.image_url || "/img/background.png"}
                      alt={service.title || "Order Image"}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                  </div>

                  {/* Bagian Konten */}
                  <div className="w-full sm:w-2/3 bg-gray-100 text-zinc-950 p-4 flex flex-col justify-between dark:bg-boxdark">
                    <div>
                      <p className="text-sm text-blue-600 font-medium dark:text-white">
                        Category ID: {service.category_id || "Unknown"}
                      </p>
                      <h3 className="text-lg md:text-xl font-semibold mt-2 dark:text-white">
                        {service.title || "No Title"}
                      </h3>
                      <p className="text-sm mt-2 text-gray-700 dark:text-white">
                        {service.description || "No Description"}
                      </p>
                      <p className="text-base md:text-lg font-bold mt-4 dark:text-white">
                        {service.price ? `Rp ${service.price}` : "No Price"}
                      </p>
                    </div>
                    <Link to={`/user/detail/${service.id}`}>
                      <button className="mt-4 bg-blue-700 hover:bg-blue-800 text-white py-2 w-full px-4 rounded-md transition">
                        View Details
                      </button>
                    </Link>
                    {/* Tombol Delete */}
                    <button
                      onClick={() => deleteService(service.id)}
                      className="mt-4 bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-md transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No services found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserService;
