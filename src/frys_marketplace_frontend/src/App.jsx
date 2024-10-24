import { TailwindcssButtons } from "./app/Button";
import Footer from "./app/Footer";
import Hero from "./app/Hero/Index";
import LiveSale from "./app/Live_Sale";
import Navbar from "./app/Navbar";
import MintPage from "./app/Mint";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/live-sale" element={<LiveSale />} />
          <Route path="/mint" element={<MintPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
