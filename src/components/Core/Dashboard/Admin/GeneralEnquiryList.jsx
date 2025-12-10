import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../../common/Custombutton";
import SearchButton from "../../../../assets/images/Searchbutton.png";
import Vector from "../../../../assets/images/Vector.png";
import container from "../../../../assets/images/container.png";
import { TailSpin } from "react-loader-spinner";
import { getEnquiriesAsync, getEnquiries, getEnquiriesResponse } from "../../../../apis/slices/enquirySlice";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const GeneralEnquiryList = ({ onRefresh }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { response, isLoading } = useSelector(getEnquiriesResponse);

  const [enquiryData, setEnquiryData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState({
    currentPage: 1,
    totalPage: 1
  });
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, [page]);

  const fetchEnquiries = () => {
    setLoading(true);
    dispatch(getEnquiries({ isLoading: true }));

    getEnquiriesAsync({
      dispatch,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 200) {
          setEnquiryData(res.data.data.data || []);
          setPageData({
            currentPage: res.data.data.paging?.currentPage || 1,
            totalPage: res.data.data.paging?.totalPage || 1
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
    fetchEnquiries();
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value === "") {
      setPage(1);
      setTimeout(() => {
        fetchEnquiries();
      }, 50);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < pageData.totalPage) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="bg-[#FFFFFF] p-4 mt-5 rounded-[18px]">
      {loading && (
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
              General Enquiry List
            </h2>
          </div>
          <div className="flex items-center relative">
            <div className="h-[60px] lg:px-[8px] flex items-center mt-[5px]">
              <div className="flex items-center relative lg:w-[204px]">
                <input
                  type="text"
                  name="search"
                  className="mt-1 w-full pr-[40px] pl-[20px] outline-none bg-[#F8F8F8] text-[14px] border p-2 border-[#ECEDEE] shadows h-[32px] rounded-[16px]"
                  placeholder="Search Enquiry"
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
          {enquiryData.length > 0 ? (
            enquiryData.map((enquiry) => (
              <li key={enquiry?.id}>
                <div className="flex justify-between gap-4 items-center">
                  <div className="px-[18px] py-[10px] mt-5 flex items-center gap-[10px] pr-[15px] flex-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 px-[18px]">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[14px] leading-[16px] text-[#171717]">
                            {enquiry?.name} {enquiry?.lastName}
                          </p>
                          {enquiry?.tag && (
                            <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-600">
                              {enquiry.tag}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="px-[18px] mt-1">
                        <p className="text-[12px] text-gray-500">{enquiry?.email}</p>
                        <p className="text-[12px] text-gray-500">{enquiry?.phoneNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Custombutton
                      value="View"
                      onClick={() => navigate(`/general-enquiries/details/${enquiry?.id}`)}
                      backgroundcolor="bg-blue-100"
                      textcolor="text-blue-600"
                      width="w-[60px]"
                    />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center py-8 text-gray-500">
              {loading ? "Loading enquiries..." : "No enquiries found"}
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
            Page {pageData?.currentPage} of {pageData?.totalPage}
          </div>
          <Custombutton
            value="Next"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
            onClick={handleNext}
            disabled={page >= pageData.totalPage}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralEnquiryList;

