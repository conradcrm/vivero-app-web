import React from "react";

export default function CategoryItem({ nombre, imagen, descripcion, estado }) {
  const imageDefault = "https://cdn.discordapp.com/embed/avatars/0.png";
  let capNombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  return (
    <div className="shadow-md bg-white p-3 flex justify-center items-center">
      <div className="grid grid-cols-5 gap-3 h-full">
        <div className=" w-30 rounded-xl flex col-span-2 bg-gray-100">
          <img
            src={imageDefault}
            alt={descripcion}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = imageDefault;
            }}
          />
        </div>
        <div className="col-span-3 h-full">
          <p className="font-bold mb-2">{capNombre}</p>
          <p className= "overflow-ellipsis overflow-hidden h-24 font-normal text-sm">{descripcion}</p>
        </div>
      </div>
    </div>
  );
}
