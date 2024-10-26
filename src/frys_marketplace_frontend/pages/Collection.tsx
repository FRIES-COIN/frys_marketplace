import React from "react";
import CollectionsPage from "../src/app/collections";
import Navbar from "../src/app/Navbar";
import Footer from "../src/app/Footer";

function Collection() {
  return (
    <div>
      <Navbar />
      <div className="mb-8">
        <CollectionsPage />
      </div>
      <Footer />
    </div>
  );
}

export default Collection;
