import { useState } from 'react';
import Signup from './Signup';


const SignUpFlow = () => {
  const [showModal, setShowModal] = useState(true);
  const [userType, setUserType] = useState(null);

  const handlePathSelection = (type) => {
    setUserType(type);
    setShowModal(false);
  };

  if (!showModal) {
    return <Signup userType={userType} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Join CarSwap</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-red-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-600 mb-8 text-center">
          Select how you would like to use CarSwap
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handlePathSelection('swap')}
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-red-500 transition-all group"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 mb-4 flex items-center justify-center bg-red-50 rounded-full group-hover:bg-red-100 transition-all">
                <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21h6m-3-5l-7 7M19 5h-4l-3 3m0-6l3 3m-3-3h-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">I want to Swap a Car</h3>
              <p className="text-gray-500 text-center text-sm">Trade cars with other users</p>
            </div>
          </button>

          <button
            onClick={() => handlePathSelection('trade')}
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-red-500 transition-all group"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 mb-4 flex items-center justify-center bg-red-50 rounded-full group-hover:bg-red-100 transition-all">
                <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21h6m-3-5l-7 7M19 5h-4l-3 3m0-6l3 3m-3-3h-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">I want to Trade a Car</h3>
              <p className="text-gray-500 text-center text-sm">Find buyers or sellers</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpFlow;
