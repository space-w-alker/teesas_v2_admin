import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { TailSpin } from "react-loader-spinner"

import Custombutton from "../../../common/Custombutton"
import { listSalesTeamAsync } from "../../../../apis/slices/salesSlice"

import bannerIcon from "../../../../assets/images/Banner-icon.png"
import sharp from "../../../../assets/images/sharp.png"
import SearchButton from "../../../../assets/images/Searchbutton.png"
import Vector from "../../../../assets/images/Vector.png"
import container from "../../../../assets/images/container.png"

const SalesTeamList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const salesTeamData = useSelector((state) => state.sales?.salesTeamList?.data || [])
  const [page, setPage] = useState(1)
  const [pageData, setPageData] = useState({
    currentPage: salesTeamData?.pagination?.currentPage,
    total_pages: salesTeamData?.pagination?.totalPages
  })
  const [searchValue, setSearchValue] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    dispatch(listSalesTeamAsync({ dispatch, token: '' }))
    setLoading(false)
  }, [dispatch])
  console.log('data', salesTeamData);
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
              Sales Team List
            </h2>
          </div>
          <div className="flex items-center relative">
            <div className="h-[60px] lg:px-[8px] flex items-center mt-[5px]">
              <div className="flex items-center relative lg:w-[204px]">
                <input
                  type="text"
                  name="search"
                  className="mt-1 w-full pr-[40px] pl-[20px] outline-none bg-[#F8F8F8] text-[14px] border p-2 border-[#ECEDEE] shadows h-[32px] rounded-[16px]"
                  placeholder="Search Sales Team"
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
          {salesTeamData?.salesTeam?.map((team) => (
            <li key={team.id}>
              <div
                className="flex justify-between gap-4 items-center"
                onClick={() => navigate(`/SalesTeam/Details`, {
                  state: {
                    id: team?.id,
                    email: team?.email,
                    phone: team?.phone,
                    whatsapp: team?.whatsapp,
                    registration_date: team?.created_at,
                    address: team?.location,
                    approved_date: team?.approved_date ?? 'Not Approved',
                    status: team?.status
                  }
                })}
              >
                <div className="px-[18px] py-[10px] mt-5 flex items-center gap-[10px] pr-[15px]">
                  <div className="w-[32px] h-[32px] rounded-[16px] bg-[#F8F5ED] relative">
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
                          {team.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Custombutton
                    value={team.status}
                    img={sharp}
                    backgroundcolor="bg-[#E9FDEE]"
                    textcolor="text-[#2760EA]"
                    imagePosition="left"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="user bg-white">
          <Custombutton
            value="Previous"
            // hidden="hidden"
            icon={<arrowleft />}
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
            // hidden="hidden"
            icon={<arrowright />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
          />
        </div>
      </div>
    </div >
  )
}

export default SalesTeamList
