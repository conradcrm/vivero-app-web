import React from "react";
import { Link } from "react-router-dom";
export default function HeaderBar({module, name, isHidden, route}) {
  
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-bold text-2xl">{module}</h3>
        <Link to={route} className={`${isHidden ? "invisible" : "visible"}`}>
          <button className="bg-b_green px-4 font-semibold py-2 rounded text-white border-b_green border hover:bg-white hover:text-black">
            {name}
          </button>
        </Link>
      </div>
    </div>
  );
}
