import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function ButtonGoBack({goBack}) {
  
  return (
    <button
      onClick={goBack}
      className="flex self-center ml-8 px-4 py-1 rounded text-sm hover:underline"
    >
      <IoIosArrowBack className="self-center mr-1" />
      <p>regresar</p>
    </button>
  );
}
