import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import book from '../../assets/images/book.png';
import Headers from '../common/Headers';
import bookopen from '../../assets/images/bookopen.png';
import { getCategoryDetailsAsync , deleteClassAsync } from '../../apis/slices/categoriesSlice';
import Modal from '../common/Modal';
import SuccessModal from '../common/SuccessModal';

const CategoryDetails = ({ isOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null); 
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
  const { data, isLoading } = useSelector(state => state.categories.details);

  useEffect(() => {
    dispatch(getCategoryDetailsAsync(id));
  }, [dispatch, id]);

  const handleDeleteClass = async () => {
    if (selectedClass?.id) {
      const result = await dispatch(deleteClassAsync(selectedClass.id));
      if (result) {
        setShowDeleteModal(false);
        setShowSuccessModal(true);
        dispatch(getCategoryDetailsAsync(id));
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const StatCard = ({ title, count }) => (
    <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm">
      <div className="p-3 bg-[#E9FDEE] rounded-lg">
        <img src={book} alt="icon" className="w-8 h-8" />
      </div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="font-bold text-2xl mt-1">{count}</p>
      </div>
    </div>
  )
  
  // Add at the top of component
  const ClassItem = ({ classData }) => {
    return (
      <div className="bg-white rounded-lg p-4 flex items-center justify-between">
        <span className="font-medium">{classData.name}</span>
        <div className="flex items-center gap-4">
        <button 
  onClick={() => navigate(`/class/${classData.id}/subjects`)}
  className="text-[#27AE60] hover:text-[#219652] transition-colors"
>
  View Subjects
</button>

          <button 
            onClick={() => {
              console.log('Editing class with ID:', classData.id);
              navigate(`/categories/${id}/edit-class/${classData.id}`, { 
                state: { 
                  categoryName: data?.name,
                  className: classData.name,
                  isEdit: true,
                  categoryId: id,
                  classId: classData.id
                } 
              });
            }}
            className="text-gray-600 hover:text-gray-800"
          >
            <FiEdit size={18} />
          </button>
          <button 
            onClick={() => {
              setSelectedClass(classData);
              setShowDeleteModal(true);
            }}
            className="text-red-500 hover:text-red-600"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    );
  };
return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
      <Headers 
        value1="Home" 
        value2="Categories Details" 
      />
      </div>

      <div className="bg-white rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#E9FDEE] rounded-lg">
            <img src={bookopen} alt="category" className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{data?.name}</h1>
            <button className={`mt-2 px-6 py-1 rounded-full text-sm font-medium ${
              data?.active ? 'bg-[#27AE60] text-white' : 'bg-red-500 text-white'
            }`}>
              {data?.active ? 'Published' : 'Inactive'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Subjects" count={data?.totalSubjects} />
        <StatCard title="Total Chapters" count={data?.totalChapters} />
        <StatCard title="Total Lessons" count={data?.totalLessons} />
      </div>
            <div className="flex justify-end mb-6">
            <button 
  onClick={() => setShowModal(true)}
  className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
>
  Add Class
</button>
      </div>
      <div className="bg-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Classes</h2>
        <div className="space-y-4">
  {data?.classes?.map((classData) => (
    <ClassItem 
      key={classData.id}
      classData={classData} 
    />
  ))}
</div>
      </div>

      <SuccessModal 
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  type="caution"
  title="Delete Class"
  message="Are you sure you want to delete this class?"
  buttonText="Delete"
  onConfirm={handleDeleteClass} 
/>

      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          dispatch(getCategoryDetailsAsync(id));
        }}
        type="success"
        title="Success"
        message="Class deleted successfully"
      />
      {showModal && (
  <Modal
    closeModal={() => setShowModal(false)}
    label="Add Class"
    value1="Add Unit Class"
    value2="Upload Bulk Class"
    addSingleButton={() => {
      navigate(`/categories/${id}/add-class`, { 
        state: { categoryName: data?.name } 
      });
    }}
    addMutipleButton={() => {
      navigate(`/categories/${id}/upload-bulk-class`, { 
        state: { categoryName: data?.name } 
      });
    }}
  />
)}

    </div>
  );
};

export default CategoryDetails;


