import React from "react";

const Parctice = (performanceHistory) => {
  return (
    <div className="rounded-[16px] lg:p-[16px] bg-[#FFFFFF]">
      <div>
        <h2 className=" font-extrabold text-[15px] lg:text-[22px] leading-[30px] text-[#000000]">
          Performance History
        </h2>
      </div>
      {performanceHistory?.performanceHistory?.map((item, index) => {
        return (
          <>
            <div
              key={index}
              className="mt-5 text-[14px] font-light text-[#000000]"
            >
              {item?.date}
            </div>
            {item?.activities?.map((data, i) => {
              return (
                <>
                  <div className="mt-2 rounded-lg bg-[#F8F8F8] p-4">
                    <div className="flex justify-between">
                      <div className="">
                        <div
                          style={{
                            backgroundColor:
                              data?.test_type == "MockTest"
                                ? "#DEF3FF"
                                : "#FFF1DE",
                          }}
                          className="flex max-w-[150px] items-center justify-center rounded-md border border-[#C3C3C3]  p-2 text-[14px]"
                        >
                          {data?.test_type == "MockTest"
                            ? "Mock Practice"
                            : "Practice Test"}
                        </div>
                        <div className="mt-3 text-[16px] font-extrabold">
                          {data?.mockTestSubject
                            ?.map((subject) => subject["subjects"]["name"])
                            .join(", ")}
                        </div>
                      </div>
                      <div className="flex text-[14px]">{data?.updated_at}</div>
                    </div>

                    <div className="mb-4 mt-4 border border-b-[0.5px] border-[#B0B1B4]" />
                  </div>
                </>
              );
            })}
          </>
        );
      })}

      <div></div>
    </div>
  );
};

export default Parctice;
