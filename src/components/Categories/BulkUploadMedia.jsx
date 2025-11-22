import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiUpload, FiDownload } from 'react-icons/fi';
import Headers from '../common/Headers';
import { TailSpin } from "react-loader-spinner";
import { getTopicDetailAsync, uploadLessonMediaXlsxAsync } from '../../apis/slices/categoriesSlice';
import SuccessModal from '../common/SuccessModal';

const BulkUploadMedia = ({ isOpen }) => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [topicName, setTopicName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadStats, setUploadStats] = useState({
        totalRowsProcessed: 0,
        successfulImports: 0,
        errors: 0,
        errorDetails: [],
        failedCsv: null
    });

    // useEffect(() => {
    //     const fetchTopicDetails = async () => {
    //         setLoading(true);
    //         try {
    //             const result = await dispatch(getTopicDetailAsync(topicId));
    //             if (result?.data?.data) {
    //                 setTopicName(result.data.data.name);
    //             } else {
    //                 setTopicName('Sample Topic');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching topic details:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchTopicDetails();
    // }, [topicId, dispatch]);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setError(null);
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            setError('Please select an Excel or CSV file');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('lesson_id', topicId);

            const apiResult = await dispatch(uploadLessonMediaXlsxAsync(formData));
            const payload = apiResult?.data || apiResult; // thunk returns result.data

            setUploadStats({
                totalRowsProcessed: payload?.totalRowsProcessed || 0,
                successfulImports: payload?.successfulImports || 0,
                errors: payload?.errors || 0,
                errorDetails: payload?.errorDetails || [],
                failedCsv: payload?.failedCsv || null
            });

            setShowSuccessModal(true);

        } catch (err) {
            setError(err.message || 'Failed to upload media');

        } finally {
            setLoading(false);
        }
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        navigate(-1);
    };

    return (
        <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
            {loading && (
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 9999,
                }}>
                    <TailSpin color="green" radius={5} />
                </div>
            )}

            <div className="mb-8">
                <Headers
                    value1="Categories"
                    value2="Topics"
                    value3={topicName}
                    value4="Bulk Upload Media"
                />
            </div>

            <div className="flex gap-6">

                <div className="flex-[2] bg-white rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-6">Bulk Upload Lesson Media</h2>

                    <div className="space-y-6">
                        <div className="mb-6">
                            <a
                                href="/sample Files/SampleFileForBulkVideoUpload.xlsx"
                                download
                                className="flex items-center gap-2 text-[#27AE60] hover:text-[#219652] font-medium"
                            >
                                <FiDownload size={20} />
                                Download Template
                            </a>

                        </div>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                            <div className="text-center">
                                <FiUpload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-600 mb-2">Drag and drop your XLSX/CSV file here</p>
                                <p className="text-gray-400 text-sm mb-4">Supported formats: .xlsx, .xls, .csv</p>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    className="hidden"
                                    accept=".xlsx,.xls,.csv"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="fileUpload"
                                    className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] cursor-pointer"
                                >
                                    Browse Files
                                </label>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex-1 bg-white rounded-xl p-6 h-fit">
                    <h3 className="text-xl font-bold mb-6">Summary</h3>

                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600 mb-1">Selected File</p>
                            <p className="font-medium">{selectedFile?.name || 'No file selected'}</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <button
                            className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] mt-6 disabled:opacity-50"
                            disabled={!selectedFile || loading}
                            onClick={handleSubmit}
                        >
                            {loading ? 'Uploading...' : 'Upload Media'}
                        </button>
                    </div>
                </div>
            </div>
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={handleCloseSuccessModal}
                type="success"
                title="Import Completed"
                message={`Import completed. ${uploadStats.successfulImports} successful, ${uploadStats.errors} errors.\n${uploadStats.errorDetails?.slice(0, 3).join('\n')}`}
                extraContent={
                    uploadStats?.failedCsv?.downloadUrl ? (
                        <a
                            href={uploadStats.failedCsv.downloadUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-2 border border-[#27AE60] text-[#27AE60] rounded-lg font-medium hover:bg-[#27AE60] hover:text-white transition-colors"
                        >
                            <FiDownload size={18} />
                            Download failed rows CSV
                        </a>
                    ) : null
                }
            />
        </div>
    );
};

export default BulkUploadMedia;
