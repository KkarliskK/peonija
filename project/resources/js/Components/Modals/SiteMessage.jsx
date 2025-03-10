import React, { useState, useEffect } from 'react';
import NavLink from '@/Components/Buttons/NavLink';

export default function SiteMessage({ auth, top_products }) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const hasSeenMessage = localStorage.getItem('hasSeenDisclaimer');
    if (!hasSeenMessage) {
      setIsVisible(true);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('hasSeenDisclaimer', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-xl p-6 mx-auto bg-white border rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700">
        <button 
          name="handle-close-message"
          onClick={() => setIsVisible(false)} 
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2 className="mb-4 text-xl font-bold dark:text-gray-200">
          PIRMS TURPINI ŅEM VĒRĀ!
        </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">Šī vietne ir izstrādāta kā kvalifikācijas darbs programmēšanas tehniķa profesijas iegūšanai.</p>
          <h3 className="font-semibold text-gray-600 dark:text-gray-300">Svarīga informācija:</h3>
          <ul>
            <li className="text-gray-600 dark:text-gray-300">Interneta veikals darbojas tikai testa vidē</li>
            <li className="text-gray-600 dark:text-gray-300">Vietnē nav iespējams veikt reālus pirkumus vai maksājumus</li>
            <li className="text-gray-600 dark:text-gray-300">Visi dati un produkti ir paredzēti tikai demonstrācijas nolūkiem</li>
          </ul>
          <p className="mb-4 text-gray-600 dark:text-gray-300">Jūs varat brīvi apskatīt veikala funkcijas un pieejamos produktus demonstrācijas režīmā.</p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">Lūdzu, ņemiet vērā, ka vietnes izstrādātāji neuzņemas nekādu atbildību par šī testa veikala izmantošanu.</p>
          <p className="mb-4 text-gray-600 dark:text-gray-300"><em>Šis projekts ir izstrādāts tikai mācību nolūkiem programmēšanas tehniķa kvalifikācijas iegūšanai.</em></p>
        <div className="flex space-x-4">
          <button 
            name="handle-message-accept"
            onClick={handleAccept} 
            className="px-4 py-2 text-white rounded bg-accent hover:bg-accent/90"
          >
            Apzinos, turpināt
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
}