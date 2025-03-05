import React from 'react';
const Custombutton = ({ value, img, backgroundcolor, textcolor, imagePosition, onClick, icon, hidden, width, height, border }) => {
  const justifyContent = imagePosition === 'left' ? 'flex-start' : 'flex-end';

  // If hidden is true, don't render anything
  if (hidden) {
    return null;
  }

  return (
    <div onClick={onClick} className={`mt-4 flex items-center justify-center ${width} ${height} rounded-md ${border ? 'border border-[#ECEDEE]' : ''} p-[10px] ${backgroundcolor}`}>
      {imagePosition === 'left' && (
        <div>
          {icon}
        </div>
      )}
      <button className={`font-normal text-[14px] leading-[18px] ${textcolor}`}>
        {value}
      </button>
      {imagePosition === 'right' && (
        <div className=''>
          {icon}
        </div>
      )}
    </div>
  );
};
export default Custombutton;