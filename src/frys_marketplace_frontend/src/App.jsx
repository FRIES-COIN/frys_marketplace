import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Collection from "../pages/Collection";
import Mint from "../pages/Mint";
import Profile from "../pages/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
