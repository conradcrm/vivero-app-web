import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageDefault from "../../resources/modules/category.jpg"
import ToggleButton from "../buttons/toggle";
export default function PlantItem({ nombre, imagen, descripcion, id_planta, id_proveedor, id_categoría, precio_compra, precio_venta,cantidad, estado, onOpenModal, setSelected, isActivate, setisActivate }) {
  let capNombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  let status = estado == 1;

  return (
    <div className="shadow bg-white rounded-lg mx-2 pt-3 grid justify-center items-center">
      <div className="max-h-60 mt-3 mb-4 w-48 rounded-lg">
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
        <div className="pt-4 max-h-36">
          <p className="font-bold mb-2 truncate">{capNombre}</p>
          <p className="overflow-ellipsis overflow-hidden h-16 font-normal text-sm">{descripcion} </p>
        </div>
        
      </div>
      <div className="max-h-16 mb-3 hidde">
        <div className="flex justify-between items-center text-sm mt-1 rounded-lg my-2">
          <span className="font-semibold">Editar</span>
          <Link to={{
            pathname: "/plant/edit",
            data: {
              id_planta: id_planta,
              nombre: nombre,
              descripcion: descripcion,
              imagen: imagen,
              precio_venta: precio_venta,
              precio_compra: precio_compra,
              cantidad: cantidad,
              id_categoria: id_categoría,
              id_proveedor: id_proveedor,
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
            status ? <span className="font-semibold">Activo</span> : <span className="font-semibold">Inactivo</span>
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
  );
}
