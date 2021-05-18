import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function ButtonGoBack({goBack}) {
  
  return (
    <button
      onClick={goBack}
      className="focus:outline-none border-0 flex self-center ml-8 rounded text-lg hover:underline"
    >
      <IoIosArrowBack className="self-center mr-1" />
      <p>Regresar</p>
    </button>
  );
}
