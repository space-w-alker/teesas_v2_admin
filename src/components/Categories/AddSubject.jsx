import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch  } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect  } from 'react';
import { useSelector } from 'react-redux';
import { createSubjectAsync , updateSubjectAsync ,getSubjectDetailsAsync } from '../../apis/slices/categoriesSlice';

const AddSubject = ({ isOpen }) => {
  const { id, subjectId } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.categories.subjects);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState('');
  const [selectedColor, setSelectedColor] = useState(''); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const colors = [
    { label: 'Green', value: '#27AE60' },
    { label: 'Blue', value: '#2D9CDB' },
    { label: 'Purple', value: '#9B51E0' },
    { label: 'Orange', value: '#F2994A' }
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (subjectId) {
      dispatch(getSubjectDetailsAsync(id));
      setIsEdit(true);
    }
  }, [dispatch, id, subjectId]);

  useEffect(() => {
    if (isEdit && data?.subjects) {
      const subject = data.subjects.find(s => s.id === parseInt(subjectId));
      if (subject) {
        setSubjectName(subject.name);
        setSelectedColor(subject.preferred_color);
        if (subject.media_path) {
          setImagePreview(`/uploads/subjects/${subject.media_path}`);
        }
      }
    }
  }, [data, isEdit, subjectId]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', subjectName);
    formData.append('preferred_color', selectedColor);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    const success = isEdit 
      ? await dispatch(updateSubjectAsync(id, subjectId, formData))
      : await dispatch(createSubjectAsync(id, formData));

    if (success) {
      navigate(`/class/${id}/subjects`);
    }
  };
  

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
          Home / Categories / Primary 1 / <span className="text-black font-medium">
            {isEdit ? 'Edit Subject' : 'Add Subject'}
          </span>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-[2] bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Subject' : 'Add Subject'}</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Subject Name</label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                placeholder="Enter subject name"
              />
            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Upload Subject Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="mx-auto h-32 object-contain mb-2" />
                  ) : (
                    <FiUpload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  )}
                  <p className="text-gray-600 text-sm mb-2">Drag and drop your image here</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className="px-4 py-1.5 bg-[#27AE60] text-white rounded-lg text-sm font-medium hover:bg-[#219652] cursor-pointer">
                    Browse Files
                  </label>
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Select Preferred Color</label>
                <select
                  value={selectedColor || ''} // Ensure value is never null
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                >
                  <option value="">Select color</option>
                  {colors.map((color) => (
                    <option key={color.value} value={color.value}>
                      {color.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Summary</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">Subject Name</p>
              <p className="font-medium">{subjectName || 'Not specified'}</p>
            </div>

            {selectedColor && (
              <div>
                <p className="text-gray-600 mb-1">Selected Color</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span>{colors.find(c => c.value === selectedColor)?.label}</span>
                </div>
              </div>
            )}

            <button 
              onClick={handleSubmit}
              className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] mt-6"
            >
              {isEdit ? 'Update Subject' : 'Create Subject'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};export default AddSubject;
