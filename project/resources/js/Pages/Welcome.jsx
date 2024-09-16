import { Link, Head } from '@inertiajs/react';
import peony from '../../assets/peony.png';
import logo from '../../assets/Peonija_logo.png';
import css from '../../css/Background.module.css';
import About from './About';
import { TiArrowSortedDown } from "react-icons/ti";
import Graphic from './Graphic';
import { useEffect, useState } from 'react';
import Special from './Special';
import Contact from './Contact';
import Dropdown from '@/Components/Dropdown';


export default function Welcome({ auth, laravelVersion, phpVersion }) {

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    
    return (
        <>
            <Head title="Sveicināti" />
            <header id='home' className="flex h-2/5 justify-center items-center">
                <nav className="w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 relative">
                    <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-2.5">
                        <a href="/" className="flex items-center w-5/6 sm:w-1/6">
                            <img src={logo} className="" alt="Your Logo" />
                        </a>
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center p-2 ms-3 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 "
                            aria-controls="navbar-dropdown"
                            aria-expanded={isOpen ? 'true' : 'false'}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                        <div className={`fixed top-0 right-0 h-full w-2/3 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} opacity-100`}>
                            <button onClick={toggleMenu} className="absolute top-4 right-4 p-2">
                                <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                            <nav className="flex flex-col p-6 z-50 items-center bg-white dark:bg-gray-800">
                                {auth.user ? (
                                    <>
                                        <button onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Sākums</button>
                                        <button onClick={() => document.getElementById('special').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Piedāvājumi</button>
                                        <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Par Mums</button>
                                        <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Kontakti</button>
                                        <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Blogs</button>
                                        <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Galerija</button>
                                        <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Izrakstīties</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Sākums</button>
                                        <button onClick={() => document.getElementById('special').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Piedāvājumi</button>
                                        <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Par Mums</button>
                                        <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Kontakti</button>
                                        <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Blogs</button>
                                        <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Galerija</button>
                                        <a href="/login" className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Pierakstīties</a>
                                        <a href="/register" className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Reģistrēties</a>
                                    </>
                                )}
                            </nav>
                        </div>
                        <div className="hidden w-full md:flex md:justify-center md:items-center" id="navbar-dropdown">
                            <ul className="flex flex-col justify-center items-center font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:text-sm md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:space-x-8">
                                {auth.user ? (
                                    <>
                                        <button onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Sākums</button>
                                        <button onClick={() => document.getElementById('special').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Piedāvājumi</button>
                                        <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Par Mums</button>
                                        <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Kontakti</button>
                                        <li>
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 relative">
                                                        Dropdown
                                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                        </svg>
                                                    </button>
                                                </Dropdown.Trigger>
                                                <Dropdown.Content>
                                                    <Dropdown.Link href="#" className="text-gray-700 dark:text-gray-200">Blogs</Dropdown.Link>
                                                    <Dropdown.Link href="#" className="text-gray-700 dark:text-gray-200">Galerija</Dropdown.Link>
                                                    <Dropdown.Link href="#" className="text-gray-700 dark:text-gray-200">Piedāvājumi</Dropdown.Link>
                                                    <Dropdown.Link href="/signout" className="text-gray-700 dark:text-gray-200">Izrakstīties</Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li><a href="#home" onClick={(e) => handleScroll(e, 'home')} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Sākums</a></li>
                                        <li><a href="#special" onClick={(e) => handleScroll(e, 'special')} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Piedāvājumi</a></li>
                                        <li><a href="#about" onClick={(e) => handleScroll(e, 'about')} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Par Mums</a></li>
                                        <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="rounded-md px-3 py-2 text-black dark:text-white transition hover:text-black/70 dark:hover:text-white/70">Kontakti</a></li>
                                        <li>
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 relative">
                                                        Vairāk
                                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                        </svg>
                                                    </button>
                                                </Dropdown.Trigger>
                                                <Dropdown.Content>
                                                    <Dropdown.Link href="#" className="text-gray-700 dark:text-gray-200">Blogs</Dropdown.Link>
                                                    <Dropdown.Link href="#" className="text-gray-700 dark:text-gray-200">Galerija</Dropdown.Link>
                                                    <Dropdown.Link href="#" className="text-gray-700 dark:text-gray-200">Piedāvājumi</Dropdown.Link>
                                                    <Dropdown.Link href="/login" className="text-gray-700 dark:text-gray-200">Pieslēgties</Dropdown.Link>
                                                    <Dropdown.Link href="/register" className="text-gray-700 dark:text-gray-200">Reģistrēties</Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>


        <main className="mt-6">
            <div className={`${css.background} h-[75dvh] text-black/50 dark:bg-black dark:text-white/50`}>
                <div className={`flex flex-col h-full w-full justify-center items-center shadow-lg`}>
                    <div className='flex flex-col items-start justify-center'>
                        <img src={peony} className=' sm:w-4/5 lg:w-2/5 mt-8 absolute top-20 -left-32 sm:top-32 sm:-left-52 -z-10 '/>
                        <h1 className='uppercase text-6xl font-semibold tracking-widest text-black sm:text-8xl'>Peonija</h1>
                        <p className={`text-black mt-5 text-xl text-center`}>Ziedi | Ziedu kompozīcijas | Telpaugi | Ziedu piegāde</p>
                        <p className='mt-12 text-black text-lg text-center'>Ziedu veikals Cēsīs, </p>
                        <button className={`${css.button_slide_effect} text-black bg-white border-2 border-accent rounded-3xl p-3 shadow-xl font-semibold uppercase transition duration-300 ease-in-out hover:text-white sm:my-4`}>
                            Apskatīt Veikalu
                        </button>

                    </div>
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <TiArrowSortedDown className={`${css.arrow} m-5 p-2`} size={38}/>
                <h1 
                    className='uppercase font-semibold text-2xl cursor-pointer'
                    onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                >
                    Par mums
                </h1>
                <TiArrowSortedDown className={`${css.arrow} m-5 p-2`} size={38}/>
            </div>
        </main>
        <Special id='special' />
        <About id='about' />
        <Graphic />        
        <Contact id='contact' />
        {/* <Shop /> */}
        <footer className="py-16 text-center text-sm bg-white dark:bg-gray-800 text-black dark:text-white/70">
            Laravel v{laravelVersion} (PHP v{phpVersion})
        </footer>

        </>
    );
}
