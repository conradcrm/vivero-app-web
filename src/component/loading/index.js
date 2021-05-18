import React from "react";
import {CgSpinner} from "react-icons/cg";

export default function Loading({size,color}) {
  return (
    <div className="flex">
      <span className="animate-spin mx-auto">
        <CgSpinner size={size} color={color}/>
      </span>
    </div>
  );
}
