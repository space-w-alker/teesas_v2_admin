import React, { useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const Modal = ({ closeModal}) => {
  const [formData, setFormData] = useState({
    user: ''
  })
 


  const onchangeHandler = (event) => {
    setFormData(() => ({
      ...formData,
      user: event.target.value
    }))
  }
 

  return (
    <div>
    <Popup open={true} closeOnDocumentClick={false} onClose={closeModal} position="center center">

        <div className="  m-auto p-4 mb-3 flex flex-col items-center  rounded-2xl ">
        <div className=" ml-auto">
        <IoIosCloseCircleOutline onClick={closeModal}  className=" text-[20px] "/>
        </div>
        <div className="bg-[#F6F6F6] border border-[#F6F6F6] rounded-2xl flex flex-col  gap-6  px-[19px] py-[19px] h-[128px] w-[97%] modal">
         <input type="text"/>
         <button>Save</button>
         
        </div>
      </div>
    </Popup>
    </div>
  );
};

export default Modal;
