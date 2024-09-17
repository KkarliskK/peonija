import { Head, router } from '@inertiajs/react';
import flower from '../../assets/rose.webp';

export default function Error({ auth }) {
    const handleRedirect = () => {
        router.visit('/');  // Uses Inertia to visit the Welcome page
    };

    return (
        <>
            <Head title="404 Not Found" />
            <main id='error' className='h-dvh mt-12 bg-gradient-to-b from-green-50 to-pink-100'>
                <div className='flex w-full flex-col justify-center items-center h-full text-center'>
                    <div className="flex items-center justify-center">
                        <h1 className="text-6xl font-extrabold text-pink-600 mb-4">404</h1>
                    </div>
                    <h2 className="text-2xl font-semibold text-green-800">
                        Oho! Kaut kas nogāja greizi.
                    </h2>
                    <p className="text-lg text-green-600 mt-4">
                        Nesatraucies, Mēs palīdzēsim atrast pareizo risinājumu!
                    </p>

                    {/* Button to trigger Inertia redirect */}
                    <button
                        onClick={handleRedirect}
                        className="mt-6 text-pink-700 bg-white border-2 border-pink-500 rounded-full py-3 px-6 font-bold shadow-lg transition duration-300 ease-in-out hover:bg-pink-600 hover:text-white hover:border-pink-600"
                    >
                        Atgriezties uz sākuma lapu
                    </button>

                    <img 
                        src={flower} 
                        alt="Bouquet of flowers" 
                        className="w-3/5 h-auto mt-8"
                    />
                </div>
            </main>
        </>
    );
}
