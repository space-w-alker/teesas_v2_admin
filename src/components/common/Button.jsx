import React, { useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';


const Button = ({ value1, value2, csvData1, csvData2 }) => {
    const [activeButton, setActiveButton] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const [exportModal, setExportModal] = useState(false);

    const handleButtonClick = (button) => {
        setActiveButton(button);
        if (button === 'Add User') {
            setIsModalOpen(true);
        } else {
            setExportModal(true);
        }
        if (button == "Manage Class") {
            navigate('/ManageLiveClass')
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setExportModal(false)
    };

    const handleClick = (e) => {
        // navigate('/UploadBulkUser');
        setIsModalOpen(true)
    };




    return (
        <div className='flex justify-end items-center gap-[15px] mt-5'>
            <div
                className={`border  rounded-[8px] ${activeButton === value1 ? 'bg-[#27AE60] text-white' : 'border-[#27AE60] text-[#27AE60]'
                    }`}
                onClick={() => handleButtonClick(value1)}
            >
                <button className='text-[14px] leading-[20px]  pt-[2px]  w-[128px] h-[40px] text-center cursor-pointer'>
                    {value1}
                </button>
            </div>

            <div
                className={`border rounded-lg ${activeButton === value2 ? 'bg-[#27AE60] text-white' : 'border-[#27AE60] text-[#27AE60]'
                    }`}
                onClick={() => handleButtonClick(value2)}
            >
                <button className='text-[14px] leading-[20px] pt-[2px] text-center  w-[123px] h-[40px] rounded-lg  cursor-pointer'>
                    {value2}
                </button>
            </div>
            {isModalOpen && (
                <Modal
                    closeModal={closeModal}
                    label="ADD USER"
                    value1="Add Single User"
                    value2="Upload Bulk Users"
                    //  onClick={handleClick}
                    addSingleButton={() => { navigate("/addUsers") }}
                    addMutipleButton={() => { navigate("/UploadBulkUser") }}
                />

            )}
            {exportModal && (
                <Modal
                    closeModal={closeModal}
                    label="Export"
                    csvData1={csvData1}
                    csvData2={csvData2}
                />
            )}
        </div>
    );
};

export default Button;
