import { AppProvider } from "./context/AppContext";
import OutlinedCard from "./components/Card/Card";
import { PostProvider } from "./context/PostContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Modal from "./components/Modal/Modal";

const App = () => {
  const showError = false; // Set this to true when an error occurs

  return (
    <AppProvider>
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={showError ? <div>Error occurred!</div> : <OutlinedCard />}
            />
            <Route path="/user/:id" element={<Modal />} />
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </AppProvider>
  );
};

export default App;
