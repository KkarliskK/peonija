import css from'../style/LandingPage.module.css'
import PeonijaLogo from '../assets/Peonija_izkartne-01.png';
import Header from '../components/Header'
import landing_photo from '../assets/PEONIJA-5.jpg';
import logo from '../assets/Peonija_logo.png';
import Font, { Text } from 'react-font'
import About from './About';

function LandingPage() {
  return (
    <>
      <Header />
        <div className={`flex justify-center items-center w-full h-full`}>
          <div className={`flex flex-col h-full w-full justify-center items-center shadow-lg ${css.tinted}`}>
            <img src={logo} className=' sm:w-4/5 lg:w-2/5 mt-8 '/>
            <Font family='Oswald'> <p className={`text-white my-4 mx-2 text-lg text-center`}>Ziedi | Ziedu kompozīcijas | Telpaugi | Ziedu piegāde</p> </Font>
            <button className={`bg-white rounded mx-2 my-2 p-3 shadow-lg font-semibold uppercase transition duration-300 ease-in-out hover:shadow-xl sm:my-4`}>Apskatīt Veikalu</button>
          </div>
        </div>
        <About />
    </>
  )
}

export default LandingPage