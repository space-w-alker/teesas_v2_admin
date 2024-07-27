import React from 'react'
import Headcomponent from '../../../common/Headcomponent'
import Custombutton from '../../../common/Custombutton'
import arrowleft from "../../../../assets/images/arrowleft.png";
import arrowright from "../../../../assets/images/arrowright.png";

const ParentSuggestionList = () => {
    const data=[

    ]
  return (
    <div className="bg-[#FFFFFF] p-4 mt-5 rounded-[18px]">
    <Headcomponent value="Parent Suggestions" border="Border" />
    <div className="">
      <ul>
      {data.map((user) => (
            <li key={user.id}>
              <div className="px-[18px] py-[10px]">
                <h6 className=" font-light text-[12px] leading-[13px] text-[#767676] ">
                  {user.created_at}
                </h6>
              </div>
              <div className="flex flex-col gap-2 ">
                <div className="flex  items-center gap-3 px-[18px]">
                  {/* <div>
                    <img src={item.icon1} alt="Icon 1" />
                  </div> */}
                  <div className="flex items-center  gap-2">
                    <p>{user.first_name}</p>
                    <p>{user.last_name}</p>
                  </div>
                </div>
                <div className="flex justify-between pr-[15px]">
                        <div>
                          <div className="pl-[20px]  flex flex-col gap-[10px]">
                            <p className=" font-normal text-[#555555] text-[12px] leading-[15px]">
                             grade
                            </p>
                            <div className="flex  items-center  py-[1px]  w-[96px] h-[16px]  bg-[#F2F2F2] ">
                              {/* <img
                                className="h-[11px]"
                                src={item.icon2}
                                alt="Icon 2"
                              /> */}
                              <p className=" font-bold text-[12px] leading-[15px] text-[#555555]">
                               
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
               
              </div>
            </li>
          ))}
      </ul>
      <div className="user">
    <Custombutton
      value="Previous"
      img={arrowleft}
      backgroundcolor="bg-[#F2F2F2]"
      textcolor="text-[#000000]"
      imagePosition="left"
    />
    <Custombutton
      value="Next"
      img={arrowright}
      backgroundcolor="bg-[#F2F2F2]"
      textcolor="text-[#000000]"
      imagePosition="right"
    />
  </div>
    </div>
  </div>
  )
}

export default ParentSuggestionList
