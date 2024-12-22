import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl text-sky-300 font-extrabold sm:text-5xl">
            Documents & diagrams
            <strong className="font-extrabold text-[#e3e3e3] sm:block">
              for engineering teams.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-[#e3e3e3]">
            Deliver accurate, consistent designs faster
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
