import Font, { Text } from 'react-font';

function About() {
  return (
    <>
      <div className="flex flex-col items-center w-full h-auto">
        <Font family="Oswald">
          <h1 className="text-5xl font-semibold mt-36">Par Mums</h1>
        </Font>
        <div className="flex flex-col sm:flex-row lg:flex-row w-full h-full justify-center items-center">
          {/* Image Box */}
          <div className="flex justify-center items-center w-full sm:w-4/12 p-2 h-full">
            <img
              className="object-scale-down max-h-full drop-shadow-md rounded-md m-auto"
              src="https://via.placeholder.com/1500x2500"
              alt=""
            />
          </div>

          <div className="flex justify-center items-center w-full sm:w-4/12 p-2 h-full">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta porro illum optio quisquam, ullam recusandae voluptatem temporibus dicta dignissimos! Error numquam cumque optio earum, sint harum. Non quos temporibus autem?</p>
          </div>

          {/* Maps Container */}
          <div className="flex justify-center items-center w-full sm:w-4/12 p-2 h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1077.3084952933568!2d25.275523764778672!3d57.3143973355247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46ebe14c2c16877b%3A0xa15c4ff5796a32a!2sPeonija!5e0!3m2!1slv!2slv!4v1720449909782!5m2!1slv!2slv"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
