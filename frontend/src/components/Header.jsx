import React, { useState, useEffect } from 'react';
import '../style/Header.module.css'
import logo from '../assets/Peonija_logo.png';
import { BsPerson } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home'); 
  useEffect(() => {
    window.addEventListener("scroll", handleScrollToSection);
    return () => {
      window.removeEventListener("scroll", handleScrollToSection);
    };
  }, []);

  function handleScrollToSection() {
    const aboutSection = document.getElementById('shop');
    const achievementsSection = document.getElementById('about');
    const experiencesSection = document.getElementById('gallery');
    const contactSection = document.getElementById('contact');
    
    const scrollPosition = window.scrollY;
    const sectionTops = {
      home: 0,
      shop: aboutSection.offsetTop - 100,
      about: achievementsSection.offsetTop - 100,
      gallery: experiencesSection.offsetTop - 100,
      contact: contactSection.offsetTop - 100,
    };

    let active = 'home';

    // Find the section whose top is just above the current scroll position
    for (const section in sectionTops) {
      if (scrollPosition >= sectionTops[section]) {
        active = section;
      } else {
        break; // Stop checking once we find the current section
      }
    }

    setActiveSection(active);
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 lg:px-6 py-2.5`}>
        <div className={`flex flex-col justify-between items-center mx-auto max-w-screen-xl sm:flex-row`}>
          <div className={`flex`}>
            <a href="/" className="flex items-center">
              <img className={`mx-2 max-h-28`} src={logo}/>
            </a>
            <button
                onClick={toggleMenu}
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg className={`${isMenuOpen ? 'hidden' : 'block'} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg className={`${isMenuOpen ? 'block' : 'hidden'} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          <div className={`lg:flex lg:w-auto lg:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href='veikals'
                  className={`block py-2 pr-4 pl-3 text-center ${activeSection === 'shop' ? 'font-semibold text-primary-700' : 'text-gray-700'} text-lg lg:font-semibold lg:text-primary-700 lg:p-0`}
                >
                  Ziedu Veikals
                </a>
              </li>
              <li>
                <a
                  href='par-mums'
                  className={`block py-2 pr-4 pl-3 text-center ${activeSection === 'about' ? 'font-semibold text-primary-700' : 'text-gray-700'} text-lg lg:font-semibold lg:text-primary-700 lg:p-0`}
                >
                  Par Mums
                </a>
              </li>
              <li>
                <a
                  href='galerija'
                  className={`block py-2 pr-4 pl-3 text-center ${activeSection === 'gallery' ? 'font-semibold text-primary-700' : 'text-gray-700'} text-lg lg:font-semibold lg:text-primary-700 lg:p-0`}
                >
                  Galerija
                </a>
              </li>
              <li>
                <a
                  href='sazina'
                  className={`block py-2 pr-4 pl-3 text-center ${activeSection === 'contact' ? 'font-semibold text-primary-700' : 'text-gray-700'} text-lg lg:font-semibold lg:text-primary-700 lg:p-0`}
                >
                  Saziniņa
                </a>
              </li>
            </ul>
          </div>
          <div className={`flex w-auto order-2 lg:flex lg:w-auto lg:order-2 my-4 justify-center items-center   ${isMenuOpen ? 'block' : 'hidden'}`} id='mobile-menu-2'>
            <a
              href='pieslegties'
              className={`mx-2`}
            >
                <BsPerson size={30} />
            </a>
            <a
              href='grozs'
              className={`mx-2`}
            >
              <FiShoppingCart size={24} />
            </a>
          </div>
        </div>
      </header>
  );
}

export default Header