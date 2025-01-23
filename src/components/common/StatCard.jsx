import React from 'react';
import book from '../../assets/images/book.png';
import statelayer from '../../assets/images/state-layer.png';

const StatCard = ({ 
  title, 
  count,
  backgroundColor = "bg-white",
  width,
  height,
  imglogo = book,
  imgbg = statelayer
}) => (
  <div className={`py-[15px] px-[15px] rounded-xl flex gap-[12px] flex-col w-full lg:${width} ${height} ${backgroundColor}`}>
    <div className="w-[32px] h-[32px] rounded-lg mb-2">
      <div className="relative">
        <img src={imglogo} className="absolute left-[7px] top-[8px]" />
        <img src={imgbg} />
      </div>
    </div>
    
    <div>
      <p className="text-[14px] leading-[16px] font-medium text-[#001D4A]">{title}</p>
    </div>
    
    <div>
      <p className="text-[20px] leading-[20px] font-medium">{count}</p>
    </div>
  </div>
);

export default StatCard;
