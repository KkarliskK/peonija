import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Cancel({ auth }) {
    return (
      <AuthenticatedLayout auth={auth}>
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 text-center bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <svg 
              className="w-8 h-8 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Maksājums neizdevās!</h1>
        <p className="text-gray-600 dark:text-white">Kaut kas nogāja greizi, mēģiniet vēlreiz, vai sazinieties ar mums!</p>
        
        <div className="pt-4 space-y-4">
          <button 
            onClick={() => window.location.href = '/checkout'} 
            className="w-full px-4 py-2 font-medium text-white transition-colors duration-200 rounded-md bg-primary-pink hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Atgriezties uz maksājumu
          </button>
        </div>
      </div>
    </div>
    </AuthenticatedLayout>
  );
}