import { TailwindcssButtons } from "./app/Button";
import Footer from "./app/Footer";
import Hero from "./app/Hero/Index";
import LiveSale from "./app/Live_Sale";
import Navbar from "./app/Navbar";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow py-4 px-1">
        <Hero />
        <LiveSale />
      </main>
      <Footer />
    </div>
  );
}

export default App;
