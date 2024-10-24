import React from "react";
import Navbar from "../src/app/Navbar";
import Hero from "../src/app/Hero/Index";
import LiveSale from "../src/app/Live_Sale";
import Footer from "../src/app/Footer";

function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">
        <Hero />
        <LiveSale />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;
