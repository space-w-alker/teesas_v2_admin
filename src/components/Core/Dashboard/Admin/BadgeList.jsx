import React, { useState } from "react"
import Custombutton from "../../../common/Custombutton"
import sharp from "../../../../assets/images/sharp.png"
import badgeIcon from "../../../../assets/images/Banner-icon.png"

import { useNavigate } from "react-router-dom"
import SearchButton from "../../../../assets/images/Searchbutton.png"
import Vector from "../../../../assets/images/Vector.png"
import container from "../../../../assets/images/container.png"
import { TailSpin } from "react-loader-spinner"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

const BadgesList = () => {
  const Navigate = useNavigate()
  const [badgeData, setBadgeData] = useState([
    {
      id: 1,
      title: "Achievement Master",
      description: "Complete 10 courses successfully",
      status: "Active",
      created_at: "2024-01-20"
    },
    {
      id: 2,
      title: "Super Learner",
      description: "Maintain 90% average score",
      status: "Active",
      created_at: "2024-01-21"
    }
  ])
  const [page, setPage] = useState(1)
  const [pageData, setPageData] = useState({
    currentPage: 1,
    total_pages: 5
  })
  const [searchValue, setSearchValue] = useState("")
  const [loading, setLoading] = useState(false)

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
          <TailSpin color="orange" radius={5} />
        </div>
      )}

      <div className="Border">
        <div className={`flex justify-between items-center relative mt-3`}>
          <div>
            <h2 className="font-medium text-[16px] lg:text-[18px] leading-[25px] text-[#2C2E32]">
              Badges List
            </h2>
          </div>
          <div className="flex items-center relative">
            <div className="h-[60px] lg:px-[8px] flex items-center mt-[5px]">
              <div className="flex items-center relative lg:w-[204px]">
                <input
                  type="text"
                  name="search"
                  className="mt-1 w-full pr-[40px] pl-[20px] outline-none bg-[#F8F8F8] text-[14px] border p-2 border-[#ECEDEE] shadows h-[32px] rounded-[16px]"
                  placeholder="Search Badge"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <img
                  src={SearchButton}
                  className="absolute w-[30px] h-[30px] top-[56%] -translate-y-1/2 right-[8px] z-50 cursor-pointer"
                  alt="Search icon"
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
          {badgeData.map((badge) => (
            <li key={badge.id}>
              <div
                className="flex justify-between gap-4 items-center cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition"
                onClick={() => Navigate(`/Badges/Details?id=${badge.id}`)}
              >
                <div className="px-[18px] py-[10px] mt-5 flex items-center gap-[10px] pr-[15px]">
                  <div className="w-[32px] h-[32px] rounded-[16px] bg-[#F8F5ED] relative">
                    <img
                      src={badgeIcon}
                      alt=""
                      className="absolute top-[8px] left-[9px]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 px-[18px]">
                      <div className="flex flex-col gap-2">
                        <p className="font-bold text-[14px] leading-[16px] text-[#171717]">
                          {badge.title}
                        </p>
                        <p className="text-[12px] text-gray-600">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="user bg-white mt-6">
          <Custombutton
            value="Previous"
            hidden="hidden"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            width="w-[115px]"
          />
          <div className="text-[#667085] text-[12px]">
            Page {pageData?.currentPage} of {pageData?.total_pages}
          </div>
          <Custombutton
            value="Next"
            hidden="hidden" 
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
          />
        </div>
      </div>
    </div>
  )
}

export default BadgesList
