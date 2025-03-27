import React, { useState } from 'react';
import container from "../../assets/images/container.png";
import Vector from "../../assets/images/Vector.png";
import SearchButton from "../../assets/images/Searchbutton.png";
import Modal from '../common/Modal';

const Headcomponent = ({
    value,
    border,
    showSearch = true,
    showFilter = true,
    showMenu = true,   
    onSearch,
    searchValue,
    onClear
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={`flex justify-between items-center ${border} relative mt-3`}>
            <div>
                <h2 className="font-medium text-[16px] lg:text-[18px] leading-[25px] text-[#2C2E32]">{value}</h2>
            </div>
            {showSearch && (
                <div className="flex items-center relative">
                    <div className="h-[60px] lg:px-[8px] flex items-center mt-[5px]">
                        <div className="flex items-center relative lg:w-[204px]">
                            <input
                                type="text"
                                name="search"
                                value={searchValue || ''}
                                onChange={(e) => onSearch && onSearch(e.target.value)}
                                className="mt-1 w-full pr-[40px] pl-[20px] outline-none bg-[#F8F8F8] text-[14px] border p-2 border-[#ECEDEE] shadows h-[32px] rounded-[16px]"
                                placeholder="Search Item"
                            />
                            <img
                                src={SearchButton}
                                className="absolute w-[30px] h-[30px] top-[56%] -translate-y-1/2 right-[8px] z-50 cursor-pointer"
                                alt="Search icon"
                                onClick={() => {
                                    if (searchValue && searchValue.trim() !== '') {
                                        onSearch && onSearch(searchValue);
                                    } else if (onClear) {
                                        onClear();
                                    }
                                }}
                            />
                        </div>
                     
                        {showFilter && (
                            <div
                                className="w-[20px] lg:w-[24px] lg:h-[24px] cursor-pointer ml-2"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <img src={Vector} alt="Filter" />
                            </div>
                        )}
                       
                        {showMenu && (
                            <div className="w-[30px] lg:w-[34px] lg:h-[40px] ml-2">
                                <img src={container} alt="Menu" />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {isModalOpen && (
                <Modal
                    closeModal={() => setIsModalOpen(false)}
                    label="Sort By"
                />
            )}
        </div>
    );
};

export default Headcomponent;
