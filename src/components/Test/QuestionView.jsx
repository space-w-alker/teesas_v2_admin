import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { FaArrowLeft } from 'react-icons/fa';

const QuestionCard = ({ hasOptions = true, question,
    options,
    correctAnswer,
    description }) => {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState({
        question,
        options,
        correctAnswer,
        description
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = value;
        setFormData({
            ...formData,
            options: newOptions
        });
    };

    const handleSave = () => {
        // Here you would typically make an API call to save the changes
        // For now, we'll just exit edit mode
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset form data and exit edit mode
        setIsEditing(false);
    };

    const handleDelete = () => {
        // Show the caution modal before deleting
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        // Here you would make an API call to delete the question
        setShowDeleteModal(false);

        // Show success message after deletion
        setShowSuccessModal(true);
    };

    const handleSuccessClose = () => {
        setShowSuccessModal(false);
        // Navigate back to the test details page
        navigate(-1);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <h3 className="font-bold text-lg">Question</h3>
                {isEditing ? (
                    <textarea
                        name="question"
                        value={formData.question}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                        rows="3"
                    />
                ) : (
                    <p className="text-gray-700">{formData.question}</p>
                )}
            </div>
            <hr className="mb-4" />

            {hasOptions ? (
                // MCQ Question UI
                <>
                    <div className="mb-4">
                        {formData.options.map((option, index) => (
                            <div key={option.id} className="flex items-center space-x-2 mb-2">
                                {isEditing ? (
                                    <>
                                        <input
                                            type="radio"
                                            name="correctOption"
                                            checked={formData.correctAnswer === option.title}
                                            onChange={() => setFormData({ ...formData, correctAnswer: option.title })}
                                            className="form-radio"
                                        />
                                        <input
                                            type="text"
                                            value={option.title}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            className="flex-1 p-2 border border-gray-300 rounded-lg"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="radio"
                                            name="question"
                                            disabled
                                            checked={formData.correctAnswer === option.title}
                                            className="form-radio"
                                        />
                                        <span className="text-gray-700">{option.title}</span>
                                    </>
                                )}
                            </div>
                        ))}

                    </div>
                    <div className="font-bold text-lg mb-4">
                        Correct Answer:
                        <span className="text-gray-700 font-normal ml-2">
                            {formData.correctAnswer}
                        </span>
                    </div>
                </>
            ) : (
                // Theory Question UI
                <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">Answer/Keywords</h3>
                    {isEditing ? (
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            rows="6"
                        />
                    ) : (
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 min-h-[150px]">
                            <p className="text-gray-700">{formData.description}</p>
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-end space-x-4">
                {isEditing ? (
                    <>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-[#27AE60] text-white px-4 py-2 rounded"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="bg-[#27AE60] text-white px-4 py-2 rounded"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-[#27AE60] text-white px-4 py-2 rounded"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <SuccessModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                type="caution"
                title="Delete Question"
                message="Are you sure you want to delete this question? This action cannot be undone."
                buttonText="Delete"
                onConfirm={confirmDelete}
            />

            {/* Success Modal after deletion */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={handleSuccessClose}
                type="success"
                title="Question Deleted"
                message="The question has been successfully deleted."
                buttonText="Go Back to Test"
                onConfirm={handleSuccessClose}
            />
        </div>
    );
};

const QuestionView = ({ isOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { questionText, topicName, questionType = "theory", question } = location.state || {
        questionText: "-",
        topicName: "-",
        questionType: "-",

    };

    console.log(question);
    // Determine if this is a multiple choice question or a theory question
    const hasOptions = question.type === "options";

    return (
        <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
            {/* Headers component for navigation */}
            <Headers value1="Home" value2="Test" value3={topicName} value4="Question Details" />

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="border-b border-gray-100 pb-4 mb-4 flex items-center justify-between">
                    <Headcomponent value="Question Details" showSearch={false} />
                    <Custombutton
                        value="Back to Test"
                        icon={<FaArrowLeft />}
                        backgroundcolor="bg-[#27AE60]"
                        textcolor="text-white"
                        imagePosition="left"
                        onClick={() => navigate(-1)} // Go back to previous page
                    />
                </div>

                <QuestionCard hasOptions={hasOptions}
                    question={question.question}
                    options={question.optionsList}
                    correctAnswer={question.expected_answer}
                    description={question.description} />
            </div>
        </div>
    );
};

export default QuestionView;