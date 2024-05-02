import './App.css';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout'
import { createContext, useState } from "react";
export const ThemeContext = createContext(null);
function App() {

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className='App' id={theme}>
     
      <Layout />
    </div>
    </ThemeContext.Provider>
   
  );
}

export default App;
