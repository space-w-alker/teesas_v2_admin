import React from 'react'
import UserCard from '../../../components/common/UserCard'
import ParentSuggestionList from '../../../components/Core/Dashboard/Admin/ParentSuggestionList'

const ParentSuggestions = ({isOpen}) => {
  return (
    <div
    className={` py-[8rem] lg:px-[10rem] px-[10px] flex flex-col  gap-2 ${
      isOpen ? "ml-[240px]" : ""
    }`}
  >
    <h2 className=" font-bold text-[22px]  leading-[28px] text-[#2C2E32] ">
    Parent Suggestions
    </h2>
    <div className=" mt-5 ">
      <UserCard
        label="Total Parent Suggestions"
        height="h-[111px]"
        backgroundcolor="bg-[#FFFFFF]"
        value="12"
      />
    </div>
    <ParentSuggestionList/>
  </div>
  )
}

export default ParentSuggestions
