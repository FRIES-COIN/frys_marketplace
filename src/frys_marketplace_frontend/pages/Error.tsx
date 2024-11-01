import React from "react";
import { Link } from "react-router-dom";
import Footer from "../src/app/Footer";

function Error() {
  return (
    <div className=" px-4 flex items-center justify-center flex-col">
      <h1 className="uppercase tracking-widest text-gray-500">
        404 | Not Found
      </h1>
    </div>
  );
}

export default Error;
