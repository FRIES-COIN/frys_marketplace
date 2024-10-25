import React from "react";
import CollectionsPage from "../src/app/collections";
import Navbar from "../src/app/Navbar";
import Footer from "../src/app/Footer";

function Collection() {
  return (
    <div>
      <Navbar />
      <div className="">
        <CollectionsPage />
      </div>
    </div>
  );
}

export default Collection;
