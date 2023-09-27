import React, { useCallback } from "react";

const CalculatorKey = ({ text, onClick = () => {}, isCta }) => {
  const handleClick = useCallback(() => onClick(text), [onClick]);

  return (
    <div
      className="flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`rounded-full h-20 w-20 flex text-center items-center ${
          !isCta ? "bg-purple-800" : "bg-orange-500"
        } justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none`}
      >
        <span>{text}</span>
      </div>
    </div>
  );
};

export default CalculatorKey;
