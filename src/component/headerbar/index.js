import React from "react";
import { Link } from "react-router-dom";
export default function HeaderBar({module, name, isHidden, route}) {
  
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-bold text-2xl">{module}</h3>
        <Link to={route} className={`${isHidden ? "invisible" : "visible"}`}>
          <button className="bg-mediumgreen px-4 py-2 rounded text-white border-mediumgreen border font-semibold hover:bg-darkgreen">
            {name}
          </button>
        </Link>
      </div>
    </div>
  );
}
