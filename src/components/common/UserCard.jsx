import React from 'react';

const UserCard = ({
  label,
  backgroundcolor,
  width,
  height,
  value,
  value2,
  img,
  imglogo,
  imgbg,
  img2,
  subContent,
  growth = false,
  graphData = [],
}) => {
  const barSpacing = 20; // Space between each bar
  const barWidth = 8; // Width of each bar
  const totalGraphWidth = graphData.length * barSpacing + 20; 

  return (
    <div
      className={`py-[15px] px-[15px] rounded-xl flex flex-col justify-between gap-[8px] w-full relative
        ${backgroundcolor} ${height} ${growth ? 'min-h-[250px]' : ''} lg:${width} mt-[10px] lg:mt-0`}
    >

      <div className="w-[32px] h-[32px] rounded-lg">
        <div className="relative">
          <img src={imglogo} className="absolute left-[7px] top-[8px]" />
          <img src={imgbg} />
        </div>
        <img src={img2} />
      </div>


      <div>
        <p className="text-[12px] leading-[12px] font-normal text-[#001D4A]">{label}</p>
      </div>
      <div>
        <p className="text-[20px] leading-[20px] font-medium">{value}</p>
      </div>

      {subContent}

 
      {growth && graphData && (
        <div className="mt-4 w-full overflow-x-auto">
          <div className="min-w-[500px]">
            <svg
              width={totalGraphWidth}
              height="120"
              viewBox={`0 0 ${totalGraphWidth} 90`}
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin"
            >
              {graphData.map((bar, index) => {
                const barX = index * barSpacing + 10;
                return (
                  <React.Fragment key={index}>
            
                    <rect
                      x={barX}
                      y={90 - bar.height} 
                      width={barWidth}
                      height={bar.height}
                      fill="#06AA8D"
                      rx="2"
                    />
                  
                    <text
                      x={barX + barWidth / 2}
                      y={90 + 10} 
                      textAnchor="middle"
                      fontSize="7"
                      fill="#001D4A"
                    >
                      {bar.label}
                    </text>
                  </React.Fragment>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;


// import React from 'react'
// import Group1000001600 from "../../assets/images/Group1000001600.png";
// const UserCard = ({label,backgroundcolor,width,height,value,value2,img,imglogo,imgbg,img2, subContent }) => {
//   return (
//     <div className={` py-[15px] lg:mt-0 mt-[10px] px-[15px] rounded-xl flex gap-[8px] flex-col  w-full lg:${width} ${height} ${backgroundcolor}`}>
//     <div className='w-[32px] h-[32px] rounded-lg'>
//     <div className=' relative'>
//      <img src={imglogo} className='absolute left-[7px] top-[8px]' />
//      <img src={imgbg}/>
//      </div>
//      <img src={img2}/>
//      <div>
//      </div>
//     </div>
//     <div>
//      <p className='text-[12px] leading-[12px] font-normal  text-[#001D4A]'>{label}</p>
//     </div>
//     <div >
//      <p className='text-[20px] leading-[20px] font-medium'>{value}</p>
//     </div>
//     {subContent}
//     <div className='flex items-center gap-[7px] '>
//      <img src={img} className='w-12px h-[12px] text-[#06AA8D]'/>
//      <p>{value2}</p>
//     </div>
//     </div>
//   )
// }

// export default UserCard
