import InstagramEmbed from '@/Components/Modals/InstagramPost';

export default function About({ auth }) {
    return (
        <>
            <main id='about' className='relative h-auto sm:h-dvh mt-12'>
                <div className='absolute top-0 w-full h-4/5 -z-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#fc61b6" fill-opacity="1" d="M0,224L80,213.3C160,203,320,181,480,170.7C640,160,800,160,960,165.3C1120,171,1280,181,1360,186.7L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" width="40%" height="100%"></path>
                    </svg>
                </div>
                <div className='flex w-full flex-col justify-center items-center h-full sm:flex-row sm:space-x-6 '>
                    {/* Center section - Text */}
                    <div className='w-full sm:w-1/2 p-4 sm:p-6 text-center sm:text-left sm:ml-28 ml-0'>
                        <h1 className='font-semibold text-4xl sm:text-5xl uppercase dark:text-white'>Par Mums</h1>
                        <p className='text-xl leading-relaxed text-left mt-8 dark:text-white'>
                            Kā floristi ar vairāk nekā 20 gadu pieredzi, mēs esam izstrādājuši unikālu prasmi un izpratni par ziedu mākslu.
                            Mēs sekojam līdzi jaunākajām tendencēm floristikā, vienlaikus saglabājot pārbaudītas vērtības un tehnikas.
                            Mūsu veikalā ir pieejami dažādi grieztie ziedi, telpaugi un ar mīlestību veidoti ziedu pušķi. Mēs lepojamies ar mūsu spēju
                            radīt ziedu kompozīcijas, kas atspoguļo mūsu klientu individuālās vēlmes un emocijas. Mēs esam gatavi palīdzēt jums izvēlēties ziedus
                            jūsu nākamajam īpašajam notikumam vai vienkārši kā dāvanu sev.
                        </p>
                    </div>
                    {/* Right section - Google Maps */}
                    <div className='flex w-full justify-center items-center'>
                        <div className='flex w-full justify-center items-center mb-8 sm:mb-0 sm:flex-row flex-col'>
                            <div className='flex w-full h-full justify-center items-center m-4 p-4'>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1077.3084952933568!2d25.275523764778672!3d57.3143973355247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46ebe14c2c16877b%3A0xa15c4ff5796a32a!2sPeonija!5e0!3m2!1slv!2slv!4v1720449909782!5m2!1slv!2slv"
                                    width="100%" 
                                    height="450"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    aria-label="Google Map location of Peonija flower shop" 
                                ></iframe>
                            </div>
                            <div className='flex sm:w-full w-4/5 h-full justify-center items-center sm:m-4 sm:p-4 px-4'>
                                <InstagramEmbed />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute flex justify-end items-end bottom-0 right-0 w-full h-1/5 -z-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path 
                            fill="#fc61b6" fill-opacity="1" 
                            d="M0,320L60,309.3C120,299,240,277,360,245.3C480,213,600,171,720,160C840,149,960,171,1080,160C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"  
                            width="40%" height="100%"
                        ></path>
                    </svg>
                </div> 
            </main>
        </>
    );
}
