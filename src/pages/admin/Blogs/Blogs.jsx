import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import UserCard from '../../../components/common/UserCard';
import BlogList from '../../../components/Core/Dashboard/Admin/BlogList';
import { getBlogsAsync, getBlogs, getBlogsResponse } from '../../../apis/slices/blogSlice';
import live from '../../../assets/images/live.png';
import liveimage from '../../../assets/images/liveimage.png';

const Blogs = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { response } = useSelector(getBlogsResponse);
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogStats();
  }, [location.pathname]);

  const fetchBlogStats = () => {
    setLoading(true);
    dispatch(getBlogs({ isLoading: true }));

    getBlogsAsync({
      dispatch,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 200) {
          setBlogData({
            total_blogs: res.data.data.paging?.totalItems || 0
          });
        }
      },
      data: {
        page: 1,
        limit: 10
      }
    });
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] flex flex-col gap-2 px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      {loading && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="green" radius={5} />
        </div>
      )}

      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
            Home / <span className='text-black font-medium'>Blogs</span>
          </div>
        </div>
      </div>

      <h2 className="mt-6 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
        Blogs
      </h2>

      <div className="mt-3">
        <UserCard
          label="Total Blogs"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={blogData?.total_blogs || 0}
          imgbg={live}
          imglogo={liveimage}
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="text-[14px] leading-[20px] text-center font-bold w-[181px] h-[40px] rounded-lg py-[7px] px-[12px] bg-green-600 text-white"
          onClick={() => navigate('/blogs/add')}
        >
          + Add Blog
        </button>
      </div>

      <BlogList onRefresh={fetchBlogStats} />
    </div>
  );
};

export default Blogs;

