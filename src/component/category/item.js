import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageDefault from "../../resources/modules/category.jpg"
import ToggleButton from "../buttons/toggle";
export default function CategoryItem({ onOpenModal, setSelected, nombre, imagen, descripcion, id_categoria, estado, isActivate, setisActivate }) {
  let capNombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  let status = estado === 1;
  
  return (
    <div className="shadow bg-white rounded-lg mx-2 pt-3 grid justify-center items-center">
      <div className="h-80 my-2 w-48 rounded-lg">
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
        <div className="pt-4 pb-2 max-h-40">
          <p className="font-bold mb-2 truncate">{capNombre}</p>
          <p className="overflow-ellipsis overflow-hidden h-20 font-normal text-sm">{descripcion} </p>
        </div>
        <div className="max-h-16 mb-3">
          <div className="flex justify-between items-center text-sm mt-1 py-2 rounded-lg">
            <span className="font-semibold">Editar</span>
            <Link to={{
              pathname: "/category/edit",
              data: {
                id_categoria: id_categoria,
                nombre: nombre,
                descripcion: descripcion,
                imagen: imagen,
                estado: estado
              },
            }}
            >
              <div className="px-2 py-1 rounded-3xl flex outline-none border-none focus:outline-none bg-gray">
                <FaEdit size={19} className="text-b_icon_gray opacity-40 mx-2 cursor-pointer" />
              </div>
            </Link>
          </div>
          <div className="flex justify-between items-center text-sm mb-6">
            {
              status ? <span className="font-semibold">Desactivar</span> : <span className="font-semibold">Activar</span>
            }
            <ToggleButton
              activate={status}
              click={setisActivate}
              changeState={setisActivate}
              selected={() => {
                setSelected();
                onOpenModal(true);
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
