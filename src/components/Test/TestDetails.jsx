import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import bookopen from '../../assets/images/bookopen.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getSubjectsWithQuestionsAsync, deleteQuestionAsync } from '../../apis/slices/questionSlice';
import { getTopicDetailAsync } from "../../apis/slices/categoriesSlice";



const TestDetails = ({ isOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const topicName = location.state?.name || 'Topic Name';
  const topic = location.state?.topic || {};
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const id = location.state.id || {};
  const question = useSelector((state) => state.questions?.subjectsWithQuestions || {});

  const topics = useSelector((state) => state.categories?.topicDetail?.data || []);
  console.log('topic', id, topics);


  useEffect(() => {
    dispatch(getTopicDetailAsync(id)).then(() => setLoading(false));
  }, [dispatch]);


  const data = {
    "class_id": topics[0]?.lesson?.chapters?.subjects?.classes?.id,
    "type": "all",
    "selectedSubject": [
      {
        "year": "all",
        "subject_id": topics[0]?.lesson?.chapters.subjects.id
      }
    ]
  }
  useEffect(() => {
    dispatch(getSubjectsWithQuestionsAsync({ dispatch, data })).then(() => setLoading(false));
  }, [dispatch, topics])
  console.log('question', id, question?.data?.options);




  const handleViewQuestion = (questionText, questionType = "mcq", question) => {
    navigate('/question-view', {
      state: {
        questionText,
        topicName,
        questionType,
        question
      }
    });
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestionToDelete(questionId);
    setShowDeleteModal(true);
  };


  const confirmDelete = () => {
    dispatch(
      deleteQuestionAsync({
        dispatch,
        class_id: questionToDelete,
        token: "",
        callbackFn: () => {
          setShowDeleteModal(false);
          setShowSuccessModal(true);
        },
      })
    );
  };
  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Test" value3={topicName} />

      <div className="bg-[#E9FDEE] rounded-xl p-6 mb-6 mt-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <img src={bookopen} alt="book" className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">{topicName}</h2>
            <button className="mt-2 px-4 py-1 bg-[#E9FDEE] text-[#27AE60] rounded-lg w-fit">
              Visible
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button className="px-8 py-2 text-[#27AE60] font-medium">
          Manage
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="border-b border-gray-100 pb-4 mb-4">

          <Headcomponent value="Details" showSearch={false} />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Category:</p>
                <p className="font-medium">{topics[0]?.lesson?.chapters?.subjects?.classes?.course?.name || '-'}</p>
              </div>
              <div>
                <p className="text-gray-600">Grade:</p>
                <p className="font-medium">{topics[0]?.lesson?.chapters?.subjects?.classes?.name || '-'}</p>
              </div>
              <div>
                <p className="text-gray-600">Chapter:</p>
                <p className="font-medium">{topics[0]?.lesson?.chapters?.name || '-'}</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className="font-medium text-[#27AE60]">{topics[0]?.lesson?.active ? "Active" : "In-Active"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-100 pb-4 mb-4">

          <Headcomponent value="Uploaded Practice And Mock Test List" showSearch={true} />
        </div>
        <div className="space-y-4">
          {question?.data?.options.map((question) => (
            <div key={question.id} className="flex items-center justify-between border-b p-4 last:border-b-0">
              <span className="text-gray-700">{question.question}</span>
              <div className="flex space-x-2">
                <button
                  className="bg-[#27AE60] text-white px-4 py-2 rounded"
                  onClick={() => handleViewQuestion(question.question, question.type, question)}
                >
                  View
                </button>
                <button
                  className="bg-[#27AE60] text-white px-4 py-2 rounded"
                  onClick={() => handleViewQuestion(question.question, question.type, question)}
                >
                  Edit
                </button>
                <button
                  className="bg-[#27AE60] text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  Delete
                </button>
              </div>
            </div>
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


      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete Question"
        message="Are you sure you want to delete this question? This action cannot be undone."
        buttonText="Delete"
        onConfirm={confirmDelete}
      />


      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="success"
        title="Question Deleted"
        message="The question has been successfully deleted."
        buttonText="Close"
      />
    </div>
  );
};

export default TestDetails;
