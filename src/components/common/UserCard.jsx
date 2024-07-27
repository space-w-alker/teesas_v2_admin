import React from 'react'
import Group1000001600 from "../../assets/images/Group1000001600.png";
const UserCard = ({label,backgroundcolor,width,height,value,value2,img,imglogo,imgbg,img2 }) => {
  return (
    <div className={` py-[15px] lg:mt-0 mt-[10px] px-[15px] rounded-xl flex gap-[8px] flex-col  w-full lg:${width} ${height} ${backgroundcolor}`}>  
    <div className='w-[32px] h-[32px] rounded-lg'>
    <div className=' relative'>
     <img src={imglogo} className='absolute left-[7px] top-[8px]' />
     <img src={imgbg}/>
     </div>
     <img src={img2}/>
     <div>
     </div>
    </div>
    <div>
     <p className='text-[12px] leading-[12px] font-normal  text-[#001D4A]'>{label}</p>
    </div>
    <div >
     <p className='text-[20px] leading-[20px] font-medium'>{value}</p>
    </div>
    <div className='flex items-center gap-[7px] '>
     <img src={img} className='w-12px h-[12px] text-[#06AA8D]'/>
     <p>{value2}</p>
    </div>
    </div>
  )
}

export default UserCard
