import peony1 from '../../assets/PEONIJA-1.webp';
import peony2 from '../../assets/PEONIJA-26.webp';
import peony3 from '../../assets/PEONIJA-12.webp';

export default function About({ auth }) {
    return (
        <>
            <main id='about' className='relative h-auto'>
                <div className='absolute top-0 w-full h-1/3 -z-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"> 
                        <path fill="#fc61b6" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,170.7C640,160,800,160,960,165.3C1120,171,1280,181,1360,186.7L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" width="40%" height="100%"></path> 
                    </svg>
                </div>
                {/* Text Section */}
                <div className='container max-w-screen-md mx-auto text-justify'>
                    <h1 className='text-3xl font-semibold text-center text-white uppercase sm:text-4xl md:text-5xl'>Par Mums</h1>
                    <p className='px-3 mt-8 mb-8 text-xl font-semibold leading-relaxed text-white fonte'>
                        Kā floristi ar vairāk nekā 20 gadu pieredzi, mēs esam izstrādājuši unikālu prasmi un izpratni par ziedu mākslu.
                        
                        Mēs sekojam līdzi jaunākajām tendencēm floristikā, vienlaikus saglabājot pārbaudītas vērtības un tehnikas.
                        
                        Mēs esam gatavi palīdzēt jums izvēlēties ziedus jūsu nākamajam īpašajam notikumam vai vienkārši kā dāvanu sev.
                    </p>
                </div>
                <div className="flex items-center justify-center w-full ">
                    <div className="container flex items-center justify-center">
                        <img src={peony1} alt="peony1" className="w-11/12 h-auto transform rounded-md shadow-lg sm:w-1/2"/>    
                    </div>
                </div>
                {/* Image Section */}
                {/* <div className='flex items-center justify-center w-full p-4 mt-4 sm:mt-0'>
                    <div className='relative grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3'>
                        <img src={peony1} alt="Peony Flower 1" className='w-full h-auto transform rounded-md shadow-lg rotate-3'/>
                        <img src={peony2} alt="Peony Flower 2" className='w-full h-auto transform rounded-md shadow-lg -rotate-3'/>
                        <img src={peony3} alt="Peony Flower 3" className='w-full h-auto mt-4 transform rounded-md shadow-lg rotate-3 sm:mt-0'/>
                    </div>
                </div> */}
                {/* <div className='absolute bottom-0 right-0 flex items-end justify-end w-full h-1/3 -z-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"> 
                        <path fill="#fc61b6" fillOpacity="1" d="M0,320L60,309.3C120,299,240,277,360,245.3C480,213,600,171,720,160C840,149,960,171,1080,160C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" width="40%" height="100%" ></path> 
                    </svg>
                </div>  */}
            </main>
        </>
    );
}
