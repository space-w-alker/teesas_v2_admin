import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Access Denied
                </h1>
                <p className="text-gray-600 mb-6">
                    You don't have permission to access this page.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Go to Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage; 