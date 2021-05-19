import React from "react";
import imageDefault from "../../resources/modules/category.jpg"
export default function CategoryItem({ nombre, imagen, descripcion, estado }) {
  let capNombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  return (
    <div className="shadow-md bg-white p-4 grid justify-center items-center">

      <div className="flex items-center justify-center bg-center bg-no-repeat bg-cover">
        <img
          className="rounded-lg"
          src={imagen}
          alt={descripcion}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = imageDefault;
          }}
        />
      </div>
      <div className="py-4">
        <p className="font-bold mb-2">{capNombre}</p>
        <p className="overflow-ellipsis overflow-hidden h-16 font-normal text-sm">{descripcion}</p>
      </div>
    </div>
  );
}
