import React from 'react';
const Custombutton = ({ value, img, backgroundcolor, textcolor, imagePosition,onClick,icon,hidden,width}) => {
  const justifyContent = imagePosition === 'left' ? 'flex-start' : 'flex-end';
  return (
    <div onClick={onClick} className={`flex items-center justify-${justifyContent} gap-[15px] ${width} h-[30px] rounded-md border border-[#ECEDEE] p-[10px] ${backgroundcolor}`}>
      {imagePosition === 'left' && (
        <div>
          <img src={img} className={`w-[22px] h-[22px] pt-[2px] ${hidden}`} />
          {icon}
        </div>
      )}
      <button className={`font-normal text-[14px] leading-[18px] ${textcolor}`}>
        {value}
      </button>
      {imagePosition === 'right' && (
        <div className=''>
          <img src={img} className={`w-[22px] h-[22px] pt-[2px] ${hidden}`} alt='Right Icon'  onClick={onClick} />
          {icon}
        </div>
      )}
    </div>
  );
};
export default Custombutton;