import React from "react";
import CollectionsPage from "../src/app/collections";
import Navbar from "../src/app/Navbar";

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
