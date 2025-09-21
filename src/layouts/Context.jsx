// src/layouts/Context.jsx

import { createContext, useContext, useEffect, useState } from "react";

export const ContextValue = createContext();

const ContextContainer = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme on mount and when theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); 
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ContextValue.Provider
      value={{
        theme,
        toggleDarkMode,
      }}
    >
      {children}
    </ContextValue.Provider>
  );
};

export default ContextContainer;

export const useContextValue = () => useContext(ContextValue);
