import { TailwindcssButtons } from "./app/Button";
import Footer from "./app/Footer";
import Hero from "./app/Hero/Index";
import LiveSale from "./app/Live_Sale";
import Navbar from "./app/Navbar";

function App() {
  return (
    <main className="bg-background rounded-md p-4 mx-2 w-full h-screen text-white">
      <Navbar />
      <Hero />
      <LiveSale />
      <Footer />
    </main>
  );
}

export default App;
