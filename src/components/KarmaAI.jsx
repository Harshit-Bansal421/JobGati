import React from 'react';

const KarmaAI = () => {
  return (
    <div className="fixed bottom-8 right-8 w-[60px] h-[60px] rounded-full bg-primary text-white flex items-center justify-center shadow-lg cursor-pointer z-[99]">
      <svg
        className="w-[30px] h-[30px]"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm4 11h8V13H8v2zm0-3h8V10H8v2z"></path>
      </svg>
    </div>
  );
};

export default KarmaAI;
