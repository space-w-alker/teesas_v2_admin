import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBook, FaDownload } from "react-icons/fa";
import Headers from "../common/Headers";
import Headcomponent from "../common/Headcomponent";
import Custombutton from "../common/Custombutton";
import Screenshot from "../../assets/images/Screenshot.png";
import { getEbookDetailsAsync } from "../../apis/slices/ebookSlice";

const EbookDetails = ({ isOpen }) => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const ebooks = useSelector((state) => state.ebook.ebookDetails || {});

  useEffect(() => {
    dispatch(getEbookDetailsAsync({ dispatch, id })).then(() => setLoading(false));
  }, [dispatch, id]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  console.log('ebooks', ebooks);
  const bookName = location.state?.name || ebooks?.data?.ebook?.title || "N/A";

  // Function to handle PDF download
  const handleDownload = (url, filename) => {
    if (!url) return;

    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'ebook.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}
    >
      <Headers value1="Home" value2="E-Books" value3={bookName} />

      <div className="mt-6 bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <FaBook className="w-5 h-5 text-[#27AE60]" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">{bookName}</h2>
            <Custombutton
              value="Visible"
              textcolor="text-[#27AE60]"
              backgroundcolor="bg-[#E9FDEE]"
              extraStyle="mt-2 w-fit"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6 gap-4">
        <Custombutton
          value="Manage"
          textcolor="text-[#27AE60]"
          backgroundcolor="bg-transparent"
          extraStyle="font-medium"
        />
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaDownload />
              <span>Download PDF</span>
            </div>
          }
          onClick={() => handleDownload(ebooks?.data?.ebook?.source, `${bookName}.pdf`)}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
          extraStyle="font-medium"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="Details" showSearch={false} />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Category:</p>
                <p className="font-medium">{ebooks?.data?.ebook?.course?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Grade:</p>
                <p className="font-medium">{ebooks?.data?.ebook?.class?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Chapter:</p>
                <p className="font-medium">{ebooks?.data?.ebook?.subject?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className="font-medium text-[#27AE60]">
                  {ebooks?.data?.ebook?.status === "1" ? "Active" : "Inactive"}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Price:</p>
                <p className="font-medium">{ebooks?.data?.ebook?.price || "Free"}</p>
              </div>
              <div>
                <p className="text-gray-600">Description:</p>
                <p className="font-medium">{ebooks?.data?.ebook?.description || "No description available"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Ebook Icon/Thumbnail */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <Headcomponent value="Ebook Thumbnail" showSearch={false} />
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg flex justify-center">
              <img
                src={ebooks?.data?.ebook?.icon || Screenshot}
                alt="ebook thumbnail"
                className="max-h-[300px] object-contain rounded"
              />
            </div>
          </div>
        </div>

        {/* Ebook Preview */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <Headcomponent value="Ebook Preview" showSearch={false} />
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              {ebooks?.data?.ebook?.source?.endsWith('.pdf') ? (
                <div className="flex flex-col items-center justify-center h-[300px] bg-gray-100 rounded">
                  <FaBook className="w-16 h-16 text-[#27AE60] mb-4" />
                  <p className="text-gray-600">PDF Document</p>
                  <p className="text-sm text-gray-500 mt-2">{bookName}</p>
                  <Custombutton
                    value="View PDF"
                    onClick={() => window.open(ebooks?.data?.ebook?.source, '_blank')}
                    textcolor="text-white"
                    backgroundcolor="bg-[#27AE60]"
                    extraStyle="mt-4"
                  />
                </div>
              ) : (
                <img
                   
                     src={`${config.MainUrl}${ebooks?.data?.ebook?.source }`}
                  alt="ebook preview"
                  className="w-full max-h-[300px] object-contain rounded"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width PDF Embed (if needed) */}
      {ebooks?.data?.ebook?.source?.endsWith('.pdf') && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <Headcomponent value="PDF Document" showSearch={false} />
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <iframe
                src={`${config.MainUrl}${ebooks?.data?.ebook?.source}`}
                title="PDF Viewer"
                className="w-full h-[600px] rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EbookDetails;
