import React from "react";
import { Link } from "react-router-dom";
export default function HeaderBar({module, name, route}) {
  
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-bold text-2xl">{module}</h3>
        <Link to={route}>
          <button className="bg-mediumgreen focus:outline-none px-4 py-2 rounded text-white border-mediumgreen border transition duration-150 ease-in-out transform hover:scale-105 hover:bg-darkgreen">
            {name}
          </button>
        </Link>
      </div>
    </div>
  );
}
