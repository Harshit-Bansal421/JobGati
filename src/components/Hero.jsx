import React from 'react';

const Hero = ({ t, setActivePage, handleSectionClick }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#f0f9ff] to-[#e1f5fe]">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
          <div className="flex-1">
            <h1
              className="text-5xl font-extrabold leading-tight mb-5 text-dark"
              dangerouslySetInnerHTML={{ __html: t.hero.title }}
            ></h1>
            <p className="text-lg text-gray-500 mb-8">{t.hero.description}</p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button
                className="bg-secondary text-white hover:bg-orange-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300"
                onClick={() => setActivePage("jobSeekerRegistration")}
              >
                {t.hero.jobSeekerBtn}
              </button>
              <button
                className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300"
                onClick={() => setActivePage("businessRegistration")}
              >
                {t.hero.businessBtn}
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center w-full">
            <div className="flex items-center justify-between max-w-[600px] w-full mx-auto flex-wrap md:flex-nowrap gap-5 md:gap-0 justify-center">
              <div className="flex flex-col items-center text-center w-[120px]">
                <div
                  className="w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center shadow-lg mb-2.5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl text-[#3B82F6]"
                  onClick={() => handleSectionClick("skill-analysis")}
                >
                  <svg
                    className="w-[30px] h-[30px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14"
                    ></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">{t.features.step1}</div>
              </div>
              <div className="text-gray-500 text-xl mx-2.5 hidden md:block">→</div>
              <div className="flex flex-col items-center text-center w-[120px]">
                <div
                  className="w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center shadow-lg mb-2.5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl text-[#F97316]"
                  onClick={() => handleSectionClick("gap-identification")}
                >
                  <svg
                    className="w-[30px] h-[30px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">{t.features.step2}</div>
              </div>
              <div className="text-gray-500 text-xl mx-2.5 hidden md:block">→</div>
              <div className="flex flex-col items-center text-center w-[120px]">
                <div
                  className="w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center shadow-lg mb-2.5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl text-[#10B981]"
                  onClick={() => handleSectionClick("training-bridge")}
                >
                  <svg
                    className="w-[30px] h-[30px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">{t.features.step3}</div>
              </div>
              <div className="text-gray-500 text-xl mx-2.5 hidden md:block">→</div>
              <div className="flex flex-col items-center text-center w-[120px]">
                <div
                  className="w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center shadow-lg mb-2.5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl text-[#8B5CF6]"
                  onClick={() => handleSectionClick("job-matching")}
                >
                  <svg
                    className="w-[30px] h-[30px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    ></path>
                  </svg>
                </div>
                <div className="text-sm font-medium">{t.features.step4}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
