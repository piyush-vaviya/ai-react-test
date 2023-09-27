import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const NavigationButton = ({ path = "/", text = "Home" }) => {
  const navigate = useNavigate();

  const navigateTo = useCallback((path) => () => navigate(path), []);

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100px]"
      onClick={navigateTo(path)}
    >
      {text}
    </button>
  );
};

export default NavigationButton;
