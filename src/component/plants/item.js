import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageDefault from "../../resources/modules/category.jpg"
import ToggleButton from "../buttons/toggle";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { BiDetail } from 'react-icons/bi';
import { FiPlusCircle } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';

export default function PlantItem({ nombre, imagen, descripcion, id_planta, id_proveedor, id_categoría, precio_compra, precio_venta, cantidad, estado, onOpenModal, setSelected, isActivate, setisActivate }) {
  let capNombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  let status = estado == 1;
  const [isShown, setIsShown] = useState(false);

  const Menu = () => {
    return (
      <div className="max-h-16 mb-3">
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

    )
  }

  const Top = () => {
    return (
      <div className={`bg-white shadow-lg h-60 w-48 ml-4 -mt-2
                         rounded-lg border border-icon_gray border-opacity-60
          ${isShown ? "block" : "hidden"}`} >
        <div className="mx-3 mt-3 opacity-100">
          <div
            className="flex op items-center justify-around hover:bg-gray py-2 rounded-lg gap-11">
            <span className="text-sm ml-2">{status ? "Desactivar" : "Activar"}</span>
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

          <hr className="my-2 text-gray" />

          <div
            className=" button-action flex cursor-pointer hover:bg-gray py-2 rounded-lg gap-2">
            <BiDetail size="20" className="ml-2 opacity-70" />
            <span className="text-sm">Detalles</span>
          </div>

          <div
            className="button-action flex cursor-pointer hover:bg-gray py-2 rounded-lg gap-2">
            <FiPlusCircle size="20" className="ml-2 opacity-70" />
            <span className="text-sm">Agregar</span>
          </div>

          <div
            className=" button-action flex cursor-pointer hover:bg-gray py-2 rounded-lg gap-2">
            <HiOutlinePencilAlt size="20" className="ml-2 opacity-70" />
            <span className="text-sm">Editar</span>
          </div>

          <hr className="my-2 text-gray" />
          <div
            className="button-action flex cursor-pointer py-2 rounded-lg gap-2 hover:bg-ligthred text-darkred">
            <FaTrashAlt size="20" className="ml-2 opacity-70" />
            <span className="text-sm ">Eliminar</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative shadow bg-white rounded-lg mx-2 grid justify-center cursor-default">
      <div className="cursor-pointer w-10 h-8 ml-1 absolute"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      >
      <HiOutlineDotsHorizontal size={25} className="text-lg mx-2" />
      <Top />
      </div>
      <div className="max-h-60 mt-5 pt-3 mb-4 w-48 rounded-lg ">
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
          <p className="font-bold mb-1 truncate">{capNombre}</p>
          <p className="overflow-ellipsis overflow-hidden h-16 text-sm">{descripcion} </p>
        </div>

      </div>

    </div>
  );
}
