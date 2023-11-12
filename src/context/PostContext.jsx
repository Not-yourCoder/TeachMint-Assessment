import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [postState, setpostState] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setpostState(data));
  }, []);
  const updatePostState = (newData) => {
    setpostState((prevState) => ({
      ...prevState,
      ...newData,
    }));
  };
  return (
    <PostContext.Provider value={{ postState, updatePostState }}>
      {children}
    </PostContext.Provider>
  );
};

const usePostContext = () => useContext(PostContext);

export { PostProvider, usePostContext };
