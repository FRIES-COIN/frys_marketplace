import React from "react";
import Navbar from "../src/app/Navbar";
import MintPage from "../src/app/Mint";
import Footer from "../src/app/Footer";

function Mint() {
  return (
    <div>
      <Navbar />
      <section className="lg:px-12 md:px-4">
        <MintPage />
      </section>
      <Footer />
    </div>
  );
}

export default Mint;
