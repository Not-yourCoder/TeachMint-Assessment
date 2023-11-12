import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setState(data));
  }, []);
  const updateState = (newData) => {
    setState((prevState) => ({
      ...prevState,
      ...newData,
    }));
  };

  return (
    <AppContext.Provider value={{ state, updateState }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
