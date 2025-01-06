import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import book from '../../assets/images/book.png';
import Searchbutton from '../../assets/images/Searchbutton.png';
import Vector from '../../assets/images/Vector.png';
import arrowleft from '../../assets/images/arrowleft.png';
import arrowright from '../../assets/images/arrowright.png';
import success from '../../assets/images/success.png';
import caution from '../../assets/images/caution.png';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, count }) => (
  <div className="bg-white rounded-xl shadow-sm p-4">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-gray-50 rounded-lg">
        <img src={book} alt="book" className="w-8 h-8" />
      </div>
      <div className="flex flex-col">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="font-bold text-2xl mt-2 text-gray-900">{count}</p>
      </div>
    </div>
  </div>
);

const Categories = ({ isOpen }) => {
  const navigate = useNavigate();

  const CategoryCard = ({ name, grades, subjects, chapters, lessons, isPublished }) => {
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
  
        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 text-center">
              <img src={success} alt="success" className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2 text-[#27AE60]">SUCCESS!</h2>
              <p className="text-xl text-gray-600 mb-6">Successfully Updated</p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
  
     
        {showDeletePopup && (
          
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 text-center">
              <img src={caution} alt="caution" className="w-24 h-24 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-2 text-red-500">CAUTION!</h2>
              <p className="text-xl text-gray-600 mb-6">You're about to delete this item</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium"
                >
                  No
                </button>
                <button
                  onClick={() => {
                   
                    setShowDeletePopup(false);
                  }}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAddCategory = () => {
    if (selectedOption === 'unit') {
      navigate('/categories/add-category');
    } else if (selectedOption === 'bulk') {
      navigate('/categories/upload-bulk');
    }
    setShowModal(false);
  };

  const categories = [
    {
      name: "Preschool",
      grades: 3,
      subjects: 6,
      chapters: 24,
      lessons: 120,
      isPublished: true
    },
    {
      name: "Primary Education",
      grades: 6,
      subjects: 8,
      chapters: 48,
      lessons: 240,
      isPublished: true
    },
    {
      name: "Secondary Education",
      grades: 4,
      subjects: 10,
      chapters: 60,
      lessons: 300,
      isPublished: true
    },
    {
      name: "Mathematics",
      grades: 5,
      subjects: 1,
      chapters: 30,
      lessons: 150,
      isPublished: true
    },
    {
      name: "Science",
      grades: 4,
      subjects: 3,
      chapters: 36,
      lessons: 180,
      isPublished: true
    },
    {
      name: "Language Arts",
      grades: 3,
      subjects: 2,
      chapters: 24,
      lessons: 120,
      isPublished: true
    }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Categories</span>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Categories" count="10" />
        <StatCard title="Total Grades" count="12" />
        <StatCard title="Total Subjects" count="25" />
        <StatCard title="Total Chapters" count="150" />
      </div>

      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Categories</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={Searchbutton} 
                alt="search" 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              />
              <input 
                type="text" 
                placeholder="Search categories..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
              />
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg">
              <img src={Vector} alt="filter" className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-lg">
              <FiMoreVertical className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button 
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
          >
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium flex items-center gap-2">
            <img src={arrowleft} alt="previous" className="w-4 h-4" />
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#27AE60] text-white rounded">1</span>
            <span className="px-3 py-1 text-gray-600">2</span>
            <span className="px-3 py-1 text-gray-600">3</span>
          </div>
          
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium flex items-center gap-2">
            Next
            <img src={arrowright} alt="next" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[400px] p-6">
            <h2 className="text-xl font-bold mb-4">Add Category</h2>
            <p className="text-gray-600 mb-4">Select one of the options below</p>
            
            <div className="bg-[#E9FDEE] rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div 
                  onClick={() => setSelectedOption('unit')}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedOption === 'unit' ? 'bg-[#27AE60] border-[#27AE60]' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium">Add Unit Category</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div 
                  onClick={() => setSelectedOption('bulk')}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedOption === 'bulk' ? 'bg-[#27AE60] border-[#27AE60]' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium">Upload Bulk Category</span>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddCategory}
                disabled={!selectedOption}
                className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;