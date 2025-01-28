import React, { useState } from 'react';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import book from '../../assets/images/book.png';

const AddPractice = ({ isOpen }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    questionTitle: '',
    description: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    image: null
  });

  const handleImageUpload = (e) => {
    setFormData({...formData, image: e.target.files[0]});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Add Practice" />


      <div className=" mt-6 flex gap-6">
        {/* Left Section - Form */}
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
           
            <h2 className="text-xl font-bold text-gray-900">Add Practice Question</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Question Title
                </label>
                <input
                  type="text"
                  value={formData.questionTitle}
                  onChange={(e) => setFormData({...formData, questionTitle: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Question Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60] h-32"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Options
                </label>
                {formData.options.map((option, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...formData.options];
                        newOptions[index] = e.target.value;
                        setFormData({...formData, options: newOptions});
                      }}
                      placeholder={`Option ${index + 1}`}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                      required
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Correct Answer
                </label>
                <select
                  value={formData.correctAnswer}
                  onChange={(e) => setFormData({...formData, correctAnswer: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                >
                  <option value="">Select correct answer</option>
                  {formData.options.map((option, index) => (
                    <option key={index} value={option}>
                      Option {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Upload Image/Diagram (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-green-50">
                  <div className="text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#E9FDEE] text-[#27AE60] rounded-lg"
                    >
                      Choose Image
                    </label>
                    <p className="mt-2 text-sm text-gray-500">
                      Supported formats: JPG, PNG, GIF
                    </p>
                    <p className="text-sm text-gray-500">
                      Maximum file size: 5MB
                    </p>
                    {formData.image && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="font-medium">Selected file:</p>
                        <p className="text-sm text-gray-600">{formData.image.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right Section - Summary */}
        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Question:</span>
                  <span className="font-medium">{formData.questionTitle || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Options:</span>
                  <span className="font-medium">{formData.options.filter(o => o).length || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Image:</span>
                  <span className="font-medium">{formData.image?.name || '-'}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Custombutton
                value="Save Question"
                onClick={handleSubmit}
                backgroundcolor="bg-[#27AE60]"
                textcolor="text-white"
                width="w-[150px]"
                extraStyle="py-3"
              />
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="success"
        title="Practice Question Added!"
        message="The practice question has been created successfully."
        buttonText="Continue"
      />
    </div>
  );
};

export default AddPractice;