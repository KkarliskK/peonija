import '../style/LandingPage.module.css'
import PeonijaLogo from '../assets/Peonija_izkartne-01.png';

function LandingPage() {
  return (
    <>
      <div className={`flex w-full h-auto`}> <img src={PeonijaLogo} /></div>
      <div className={`flex w-full bg-white`}>Sveiks lietotāj!</div>
    </>
  )
}

export default LandingPage