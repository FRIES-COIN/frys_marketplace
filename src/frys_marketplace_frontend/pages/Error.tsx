import React from "react";
import { Link } from "react-router-dom";
import Footer from "../src/app/Footer";

function Error() {
  return (
    <div className=" px-4 flex items-center justify-center flex-col">
      <img
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
        className="mt-12 rounded-xl"
      />
      <h1 className="uppercase tracking-widest text-gray-500 mt-8">
        404 | Not Found
      </h1>
      <Link to="/" className=" text-white underline mt-8">
        Back Home
      </Link>
    </div>
  );
}

export default Error;
