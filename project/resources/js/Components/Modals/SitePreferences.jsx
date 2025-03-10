import React, { useState, useEffect } from 'react';
import NavLink from '@/Components/Buttons/NavLink';


export default function SitePreferences({ auth, top_products }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="relative max-w-xl p-6 mx-auto bg-white border rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700">
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h2 className="mb-4 text-xl font-bold dark:text-gray-200">
          Sīkdatņu iestatījumi
        </h2>
        
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Mūsu vietne izmanto sīkdatnes, lai uzlabotu jūsu lietošanas pieredzi. 
          Vai piekrītat mūsu sīkdatņu lietošanai?
        </p>
        
        <div className="flex space-x-4">
          <button 
            onClick={handleAccept} 
            className="px-4 py-2 text-white rounded bg-accent hover:bg-accent/90"
          >
            Piekrītu
          </button>
          
          <button 
            onClick={handleDecline}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded dark:text-gray-200 hover:bg-gray-50"
          >
            Nepiekrītu
          </button>
          
          <NavLink href="/private-rules" 
            className="px-4 py-2 text-accent hover:underline"
          >
            Lasīt vairāk
          </NavLink>
        </div>
      </div>
    </div>
  );
};

