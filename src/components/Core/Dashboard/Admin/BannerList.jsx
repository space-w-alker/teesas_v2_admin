import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../../common/Custombutton";
import bannerIcon from "../../../../assets/images/Banner-icon.png";
import SearchButton from "../../../../assets/images/Searchbutton.png";
import Vector from "../../../../assets/images/Vector.png";
import container from "../../../../assets/images/container.png";
import { TailSpin } from "react-loader-spinner";
import { getBannersAsync, getBanners, getBannersResponse, deleteBannerAsync, deleteBannerResponse } from "../../../../apis/slices/bannerSlice";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import SuccessModal from "../../../common/SuccessModal";

const BannerList = ({ onRefresh }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { response, isLoading } = useSelector(getBannersResponse);
  const deleteResponse = useSelector(deleteBannerResponse);

  const [bannerData, setBannerData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState({
    currentPage: 1,
    total_pages: 1
  });
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = () => {
    setLoading(true);
    dispatch(getBanners({ isLoading: true }));

    getBannersAsync({
      dispatch,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 200) {
          setBannerData(res.data.data.Banner || []);
          setPageData({
            currentPage: res.data.data.pagination.currentPage,
            total_pages: res.data.data.pagination.totalPages
          });
        }
      },
      data: {
        page,
        limit: 10,
        search: searchValue
      }
    });
  };

  const handleSearch = () => {
    setPage(1);
    fetchBanners();
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value === "") {
      setPage(1);
      setTimeout(() => {
        fetchBanners();
      }, 50);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
      setTimeout(() => {
        fetchBanners();
      }, 100);
    }
  };

  const handleNext = () => {
    if (page < pageData.total_pages) {
      setPage(prev => prev + 1);
      setTimeout(() => {
        fetchBanners();
      }, 100);
    }
  };

  const handleDeleteClick = (bannerId) => {
    setSelectedBannerId(bannerId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedBannerId) return;

    setDeleteLoading(true);

    deleteBannerAsync({
      dispatch,
      bannerId: selectedBannerId,
      callbackFn: (res) => {
        setDeleteLoading(false);
        setShowDeleteModal(false);

        if (res?.data?.status === 200) {
          setSuccessMessage("Banner deleted successfully");
          setShowSuccessModal(true);

          fetchBanners();

          if (onRefresh) onRefresh();
        } else {
          alert(res?.data?.message || "Failed to delete banner");
        }
      }
    });
  };

  return (
    <div className="bg-[#FFFFFF] p-4 mt-5 rounded-[18px]">
      {(loading || deleteLoading) && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="green" radius={5} />
        </div>
      )}

      <div className="Border">
        <div className={`flex justify-between items-center relative mt-3`}>
          <div>
            <h2 className="font-medium text-[16px] lg:text-[18px] leading-[25px] text-[#2C2E32]">
              Banner List
            </h2>
          </div>
          <div className="flex items-center relative">
            <div className="h-[60px] lg:px-[8px] flex items-center mt-[5px]">
              <div className="flex items-center relative lg:w-[204px]">
                <input
                  type="text"
                  name="search"
                  className="mt-1 w-full pr-[40px] pl-[20px] outline-none bg-[#F8F8F8] text-[14px] border p-2 border-[#ECEDEE] shadows h-[32px] rounded-[16px]"
                  placeholder="Search Banner"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <img
                  src={SearchButton}
                  className="absolute w-[30px] h-[30px] top-[56%] -translate-y-1/2 right-[8px] z-50 cursor-pointer"
                  alt="Search icon"
                  onClick={handleSearch}
                />
              </div>
              <div className="w-[20px] lg:w-[24px] lg:h-[24px] cursor-pointer ml-2">
                <img src={Vector} alt="Vector" />
              </div>
              <div className="w-[30px] lg:w-[34px] lg:h-[40px] ml-2">
                <img src={container} alt="Container" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <ul>
          {bannerData.length > 0 ? (
            bannerData.map((banner) => (
              <li key={banner.id}>
                <div className="flex justify-between gap-4 items-center">
                  <div className="px-[18px] py-[10px] mt-5 flex items-center gap-[10px] pr-[15px]">
                    <div className="w-[32px] h-[32px] rounded-[16px] relative">
                      <img
                        src={bannerIcon}
                        alt=""
                        className="absolute top-[8px] left-[9px]"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 px-[18px]">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[14px] leading-[16px] text-[#171717]">
                            {banner.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Custombutton
                      value="View"
                      onClick={() => navigate(`/Banner/BannerDetails?id=${banner?.id}`)}
                      backgroundcolor="bg-blue-100"
                      textcolor="text-blue-600"
                      width="w-[60px]"
                    />
                    <Custombutton
                      value="Edit"
                      onClick={() => navigate(`/Banner/AddBanner?id=${banner?.id}`)}
                      backgroundcolor="bg-green-100"
                      textcolor="text-green-600"
                      width="w-[60px]"
                    />
                    <Custombutton
                      value="Delete"
                      onClick={() => handleDeleteClick(banner.id)}
                      backgroundcolor="bg-red-100"
                      textcolor="text-red-600"
                      width="w-[60px]"
                    />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center py-8 text-gray-500">
              {loading ? "Loading banners..." : "No banners found"}
            </li>
          )}
        </ul>

        <div className="user bg-white flex justify-between items-center mt-6">
          <Custombutton
            value="Previous"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            width="w-[115px]"
            onClick={handlePrevious}
            disabled={page === 1}
          />
          <div className="text-[#667085] text-[12px]">
            Page {pageData?.currentPage} of {pageData?.total_pages}
          </div>
          <Custombutton
            value="Next"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
            onClick={handleNext}
            disabled={page >= pageData.total_pages}
          />
        </div>
      </div>


      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete Banner"
        message="Are you sure you want to delete this banner?"
        buttonText="Delete"
        onConfirm={handleDeleteConfirm}
      />


      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="success"
        title="Success"
        message={successMessage}
        buttonText="Close"
        onConfirm={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default BannerList;
