import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Collection from "../pages/Collection";
import Mint from "../pages/Mint";
import Profile from "../pages/Profile";
import Footer from "./app/Footer";
import Error from "../pages/Error";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="w-full overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
