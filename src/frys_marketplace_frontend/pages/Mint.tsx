import React from "react";
import Navbar from "../src/app/Navbar";
import MintPage from "../src/app/mint";

function Mint() {
  return (
    <div>
      <Navbar />
      <section className="lg:px-12 md:px-4">
        <MintPage />
      </section>
    </div>
  );
}

export default Mint;
