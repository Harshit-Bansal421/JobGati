import React from 'react';

const Dashboard = ({ t }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-5">
        <h1 className="text-4xl font-bold mb-12 text-dark text-left">
          {t.welcome}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div className="bg-white rounded-lg p-8 shadow-sm text-center h-fit">
            <div className="w-[120px] h-[120px] rounded-full bg-primary mx-auto mb-5 flex items-center justify-center text-white text-[40px] font-bold relative">
              AJ
              <div className="absolute top-2.5 right-2.5 bg-success text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">✓</div>
            </div>
            <h3 className="text-2xl font-semibold mb-1">
              {t.profile.name}
            </h3>
            <p className="text-gray-500 mb-5">
              {t.profile.title}
            </p>
            <div>
              <h4 className="font-medium mb-2">Current Skills:</h4>
              <div className="flex flex-wrap gap-2.5 justify-center mt-5">
                <span className="bg-blue-50 text-primary px-3 py-1.5 rounded-[20px] text-sm font-medium">Welding L2</span>
                <span className="bg-blue-50 text-primary px-3 py-1.5 rounded-[20px] text-sm font-medium">Digital Literacy L1</span>
                <span className="bg-blue-50 text-primary px-3 py-1.5 rounded-[20px] text-sm font-medium">
                  Solar Panel Installation L1
                </span>
              </div>
            </div>
          </div>
          <div className="dashboard-content grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-5">{t.skillGap}</h3>
              <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Radar Chart: User Skills vs Required Job Role
              </div>
              <p
                className="text-xs text-gray-500 mt-2.5"
              >
                Blue: Your Skills | Orange: Required for Solar
                Technician
              </p>
            </div>
            <div
              className="flex flex-col gap-8"
            >
              <div
                className="bg-white rounded-lg p-6 shadow-sm text-center"
              >
                <h3 className="text-lg font-semibold mb-5">{t.progress}</h3>
                <div className="w-[150px] h-[150px] rounded-full bg-[conic-gradient(var(--color-primary)_80%,#e5e7eb_0)] flex items-center justify-center mx-auto mb-5 relative before:content-[''] before:absolute before:w-[120px] before:h-[120px] before:rounded-full before:bg-white">
                  <div className="relative z-10 text-2xl font-bold text-primary">80%</div>
                </div>
                <p>{t.ready}</p>
                <div
                  className="text-warning font-semibold mt-2.5"
                >
                  <span role="img" aria-label="shield">
                    🛡️
                  </span>{" "}
                  {t.unlocked}
                </div>
              </div>
              <div
                className="bg-white rounded-lg p-6 shadow-sm text-center"
              >
                <svg
                  className="w-12 h-12 text-primary mx-auto mb-2.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.43 12.56 13 13.01 13 14h-2c0-.56.44-1.01 1-1.46l.9-.92C13.79 11.23 14 10.79 14 10c0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .79-.21 1.54-.63 2.19z"></path>
                </svg>
                <p className="font-semibold">
                  {t.askAI}
                </p>
                <p className="text-sm text-gray-500">
                  {t.aiDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm mt-8">
          <h3 className="text-lg font-semibold mb-5">{t.topMatches}</h3>
          <div className="flex flex-col md:flex-row items-center justify-between p-5 rounded-lg mb-4 bg-blue-50 border-l-4 border-primary gap-4 md:gap-0">
            <div
              className="flex items-center gap-5"
            >
              <div className="text-3xl font-bold text-primary">
                {t.match1.percent}
              </div>
              <div className="job-details">
                <h4 className="text-lg mb-1.5 font-medium">{t.match1.title}</h4>
                <p className="text-gray-500 text-sm">{t.match1.desc}</p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button className="bg-secondary text-white hover:bg-orange-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300">
                {t.closeGap}
              </button>
              <button className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300">
                {t.viewDetails}
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between p-5 rounded-lg mb-4 bg-blue-50 border-l-4 border-primary gap-4 md:gap-0">
            <div
              className="flex items-center gap-5"
            >
              <div
                className="text-3xl font-bold text-warning"
              >
                {t.match2.percent}
              </div>
              <div className="job-details">
                <h4 className="text-lg mb-1.5 font-medium">{t.match2.title}</h4>
                <p className="text-gray-500 text-sm">{t.match2.desc}</p>
              </div>
            </div>
            <button className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300">
              {t.applyNow}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
