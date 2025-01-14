import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { Service } from "../../models/Service";
import { useServiceContext } from "../../context/ServiceContext";
import indonesiaData from "../../../assets/location/indonesia_data.json";
import { useAuth } from "../../hooks/useAuth";

const ListService: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 9;

  const { services, loading, error } = useServiceContext();

  const { user, getUserData } = useAuth();

  const navigate = useNavigate();

  const filteredItems = services.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const displayedItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleCardClick = (id: number) => {
    navigate(`/user/detail/${id}`);
  };

  React.useEffect(() => {
    getUserData();
  }, [!user]);

  return (
    <>
      <div className="bg-slate-100 md:mt-2 min-h-screen pt-20 pb-6 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            All Service
          </h2>

          <div className="mb-8">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full p-3 rounded-md border border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayedItems.length > 0 ? (
                displayedItems.map((item: Service) => (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item.id)}
                    className="bg-white shadow-md rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg"
                  >
                    <div className="w-full bg-gray-300 rounded-lg flex justify-center items-center mb-4">
                      <img
                        src={item.image_url_full}
                        alt="Service"
                        className="w-full h-auto max-h-60 object-cover rounded-lg"
                      />
                    </div>
                    <div className="m-4">
                      <div className="flex justify-between">
                        <p className="text-lg font-bold text-gray-800">
                          Rp{item.price || "N/A"}
                        </p>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        {item.description || "No description available."}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No services found.</p>
              )}
            </div>
          )}

          <div className="flex justify-center mt-8 items-center">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              previousLabel="< Previous"
              containerClassName="pagination"
              activeClassName="active"
              pageLinkClassName="page-link"
              previousLinkClassName="prev-link"
              nextLinkClassName="next-link"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListService;
