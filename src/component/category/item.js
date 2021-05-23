import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import imageDefault from "../../resources/modules/category.jpg"
export default function CategoryItem({ nombre, imagen, descripcion, id_categoria, estado }) {
  let capNombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  return (
    <div className="shadow bg-white rounded-lg mx-2 py-3 grid justify-center items-center">
      <div className="h-64 my-2 w-48 rounded-lg">
        <div className="h-28 rounded-lg bg-gray flex items-center justify-center bg-center bg-no-repeat bg-cover">
          <img
            className="rounded-lg max-h-32"
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
          <p className="overflow-ellipsis overflow-hidden h-16 font-normal text-sm">{descripcion} </p>
        </div>
        <div className="flex justify-end items-center text-sm my-1">
          <Link to={{
            pathname: "/category/edit",
            data: {
              id_categoria:id_categoria,
              nombre: nombre,
              descripcion:descripcion,
              imagen:imagen
            },
          }}
          >
            <FaEdit size={19} className="text-b_icon_gray opacity-40 mr-1 cursor-pointer" />
          </Link>
          <MdDeleteForever size={22} className="text-mediumred cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
