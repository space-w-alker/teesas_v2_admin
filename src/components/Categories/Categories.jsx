import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import book from '../../assets/images/book.png';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';
import SuccessModal from '../common/SuccessModal';
import Custombutton from '../common/Custombutton';
import { FaPlus } from 'react-icons/fa';


const Categories = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const CategoryCard = ({ name, grades, subjects, chapters, lessons }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleEdit = () => {
      setShowDropdown(false);
      setShowSuccessPopup(true);
    };

    const handleDelete = () => {
      setShowDropdown(false);
      setShowDeletePopup(true);
    };

    return (
      <div className="bg-[#F9F9F9] rounded-xl p-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <img src={book} alt="category" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{name}</h3>
              <button className="mt-2 px-4 py-1 rounded-full text-sm font-medium bg-[#27AE60] text-white">
                Published
              </button>
            </div>
          </div>
          <div className="relative">
            <FiMoreVertical 
              className="text-gray-400 cursor-pointer" 
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg py-2 z-10">
                <button 
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  onClick={() => navigate(`/categories/details/${name}`)}
                >
                  View Class
                </button>
                <button 
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button 
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-50"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <div>
            <p className="text-sm text-gray-500">Grades</p>
            <p className="font-medium">{grades}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Subjects</p>
            <p className="font-medium">{subjects}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Chapters</p>
            <p className="font-medium">{chapters}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Lessons</p>
            <p className="font-medium">{lessons}</p>
          </div>
        </div>

        {showSuccessPopup && (
          <SuccessModal
            isOpen={showSuccessPopup}
            onClose={() => setShowSuccessPopup(false)}
            type="success"
            title="SUCCESS!"
            message="Successfully Updated"
          />
        )}

        {showDeletePopup && (
          <SuccessModal
            isOpen={showDeletePopup}
            onClose={() => setShowDeletePopup(false)}
            type="caution"
            title="CAUTION!"
            message="You're about to delete this item"
            buttonText="Yes"
          />
        )}
      </div>
    );
  };

  const categories = [
    {
      name: "Matric",
      grades: 3,
      subjects: 6,
      chapters: 24,
      lessons: 120,
    },
    {
      name: "Primary Education",
      grades: 6,
      subjects: 8,
      chapters: 48,
      lessons: 240,
    },
    {
      name: "Secondary Education",
      grades: 4,
      subjects: 10,
      chapters: 60,
      lessons: 300,
    },
    {
      name: "Mathematics",
      grades: 5,
      subjects: 1,
      chapters: 30,
      lessons: 150,
    },
    {
      name: "Science",
      grades: 4,
      subjects: 3,
      chapters: 36,
      lessons: 180,
    },
    {
      name: "Language Arts",
      grades: 3,
      subjects: 2,
      chapters: 24,
      lessons: 120,
    }
  ];

  const handleAddCategory = () => {
    if (selectedOption === 'unit') {
      navigate('/categories/add-category');
    } else if (selectedOption === 'bulk') {
      navigate('/categories/upload-bulk');
    }
    setShowModal(false);
  };
  

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers 
        value1="Home" 
        value2="Categories" 
      />

      <div className=" mt-6 mb-8">
        <h1 className="text-xl  text-gray-900">Categories</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Categories" count="10" />
        <StatCard title="Total Grades" count="12" />
        <StatCard title="Total Subjects" count="25" />
        <StatCard title="Total Chapters" count="150" />
      </div>
      <div className="flex justify-end mb-6">
  <Custombutton
    value={
      <div className="flex items-center gap-2">
        <FaPlus />
        <span>Add Category</span>
      </div>
    }
    backgroundcolor="bg-[#27AE60]"
    textcolor="text-white"
    onClick={() => setShowModal(true)}
  />
</div>


      <div className="bg-white rounded-xl p-6">
        <Headcomponent 
          value="Categories"
          showSearch={true}
        />

       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>

      {showModal && (
  <Modal
    closeModal={() => setShowModal(false)}
    label="Add Category"
    value1="Add Unit Category"
    value2="Upload Bulk Category"
    addSingleButton={() => {
      setSelectedOption('unit');
      handleAddCategory();
    }}
    addMutipleButton={() => {
      setSelectedOption('bulk');
      handleAddCategory();
    }}
  />
)}
    </div>
  );
};

export default Categories;