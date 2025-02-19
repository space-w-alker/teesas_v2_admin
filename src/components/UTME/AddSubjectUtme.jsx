import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectDetailsAsync, selectSubjectDetails, deleteSubjectAsync } from '../../apis/slices/categoriesSlice';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import bookopen from '../../assets/images/bookopen.png';
import { FaPlus } from 'react-icons/fa';
import StatCard from '../common/StatCard';
const SubjectItem = ({ subject, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <div>
          <span className="font-medium text-gray-800">{subject.name}</span>
          {subject.universityName && (
            <p className="text-sm text-gray-500 mt-1"> University: {subject.universityName}</p>
          )}
        </div>

      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate(`/subjects/${subject.id}/chapters`, {
            state: {
              subjectId: subject.id,
              subjectName: subject.name
            }
          })}
          className="text-black"
        >
          View Chapter
        </button>
        <button
          onClick={() => onEdit(subject)}
          className="text-black"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(subject.id)}
          className="text-red-500 hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}; const AddSubjectUTME = ({ isOpen }) => {
  const navigate = useNavigate(); const location = useLocation();
  const dispatch = useDispatch();
  const { data: classData, isLoading } = useSelector(selectSubjectDetails);
  const classId = location.state?.classId;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    if (classId) {
      dispatch(getSubjectDetailsAsync(classId));
    }
  }, [dispatch, classId]);

  const handleAddSubject = () => {
    navigate('/create-new-subject', {
      state: {
        classId: classData.id,
        university_id: classData.university_id
      }
    });
  };

  const handleEdit = (subject) => {
    navigate('/create-new-subject', {
      state: {
        mode: 'edit',
        subjectData: subject,
        classId: classData.id
      }
    });
  };

  const handleDelete = async (subjectId) => {
    const success = await dispatch(deleteSubjectAsync(classData.id, subjectId));
    if (success) {
      setShowDeleteModal(false);
      dispatch(getSubjectDetailsAsync(classData.id));
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="UTME Subjects" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="UTME Subject Management" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Subjects" count={classData?.totalSubjects || 0} />
        <StatCard title="Total Chapters" count={classData?.totalChapters || 0} />
        <StatCard title="Total Topics" count={classData?.subjects?.reduce((acc, subject) => acc + subject.totalLessons, 0) || 0} />
      </div>


      <div className="flex justify-end mb-6">
        <Custombutton
          value={<div className="flex items-center gap-2"><FaPlus className="text-sm" /><span>Add Subject</span></div>}
          onClick={handleAddSubject}
          backgroundcolor="bg-[#27AE60]"
          textcolor="text-white"
          width="w-[130px]"
          extraStyle="py-2"
        />
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Subjects" showSearch={false} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {classData?.subjects?.map((subject) => (
              <SubjectItem
                key={subject.id}
                subject={subject}
                onEdit={handleEdit}
                onDelete={(id) => {
                  setSelectedSubject(id);
                  setShowDeleteModal(true);
                }}
              />
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <Custombutton
              value="Previous"
              hidden="hidden"
              icon={<FaArrowLeft />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor="text-[#000000]"
              imagePosition="left"
            />
            <Custombutton
              value="View All"
              hidden="hidden"
              backgroundcolor="bg-[#F2F2F2]"
              textcolor="text-[#000000]"
            />
            <Custombutton
              value="Next"
              hidden="hidden"
              icon={<FaArrowRight />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor="text-[#000000]"
              imagePosition="right"
            />
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Confirm Delete"
        message="Are you sure you want to delete this subject?"
        buttonText="Delete"
        onConfirm={() => handleDelete(selectedSubject)}
      />
    </div>
  );
};
export default AddSubjectUTME;