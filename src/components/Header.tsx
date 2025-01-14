<<<<<<< Updated upstream
export default function Header() {
=======
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Header() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

>>>>>>> Stashed changes
  return (
    <section
      className="relative bg-cover bg-blue-950 bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(/img/background-blue.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Content */}
      <div className="relative max-w-5xl mx-auto z-10 lg:px-20 text-center h-screen flex flex-col justify-center items-center px-4 sm:px-8">
        <h1 className="text-3xl sm:text-5xl text-white font-semibold mb-2">
          Find Local Service For Every Problem
        </h1>
        <p className="text-sm sm:text-lg w-full sm:w-5/6 text-slate-200 leading-relaxed mb-5 mt-2">
          Platform yang mempertemukan kebutuhan masyarakat dengan keterampilan
          komunitas lokal, seperti jasa perbaikan, kerajinan, atau pendidikan.
        </p>
        <a
          href="/auth/signin"
          className="inline-block text-xs sm:text-sm lg:text-base font-semibold text-white bg-blue-900 py-2 sm:py-3 px-6 sm:px-10 rounded-full hover:shadow-lg hover:bg-blue-950 hover:text-white transition duration-300 ease-in-out"
        >
          Join Now
        </a>

<<<<<<< Updated upstream
        <div className="flex flex-col mt-6 sm:mt-10 justify-center items-center">
=======
        <div
          className="flex flex-col mt-6 sm:mt-10 justify-center items-center"
          data-aos="fade-up"
        >
>>>>>>> Stashed changes
          <p className="text-sm sm:text-base text-white">
            Trusted by 1000+ companies
          </p>
          <div className="flex flex-wrap justify-center items-center mt-3 gap-3 sm:gap-4">
            <img src="img/logo1.png" className="h-4 sm:h-[25px]" alt="Logo 1" />
            <img src="img/logo2.png" className="h-4 sm:h-[25px]" alt="Logo 2" />
            <img src="img/logo3.png" className="h-4 sm:h-[25px]" alt="Logo 3" />
            <img src="img/logo4.png" className="h-4 sm:h-[25px]" alt="Logo 4" />
          </div>
        </div>
      </div>
    </section>
  );
}
