
import Font, { Text } from 'react-font'

function About() {
  return (
    <>
        <div className={`flex flex-col items-center  w-full h-full`}>
          <Font family='Oswald'><h1 className={`text-5xl font-semibold mt-36`}>Par Mums</h1></Font>
          <div className={`flex w-full h-full justify-center items-center`}>  {/**Put some photos in here like to and some text at the middle**/}
            <div className={`flex justify-center items-center w-4/12 mx-2 p-2 h-full`}>image</div>
            <div className={`flex justify-center items-center w-4/12 mx-2 p-2 h-full text-center`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ipsa necessitatibus tempora ex veniam, sunt magni officiis temporibus nesciunt ad eaque reprehenderit consectetur commodi soluta dolorum impedit, saepe vel in.</div>
            <div className={`flex justify-center items-center w-4/12 mx-2 p-2 h-full`}>image</div>
          </div>
        </div>
    </>
  )
}

export default About