import React, { useState } from "react";
import { Link } from "react-router-dom";
import imageDefault from "../../resources/modules/category.jpg"
import ToggleButton from "../buttons/toggle";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { FaTrashAlt } from 'react-icons/fa';
import { HandleDonwload } from "../../files";


export default function CategoryItem({ nombre, imagen, descripcion, id_categoria, estado, onOpenModal, onOpenDeleteModal, setSelected, isActivate, setisActivate }) {
  let capNombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  let status = estado === undefined || estado === 1;
  const [isShown, setIsShown] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const Menu = () => {
    return (
      <div className={`bg-white shadow-lg max-h-60 w-48 ml-4 -mt-2
                         rounded-lg border border-icon_gray border-opacity-60
                         ${isShown ? "block" : "hidden"}`} >
        <div className="mx-3 mt-3 opacity-100">
          <Link
            className=" button-action flex cursor-pointer hover:bg-gray py-2 rounded-lg gap-2"
            to={`/category/edit/${id_categoria}`}>
            <HiOutlinePencilAlt size="20" className="ml-2 opacity-70" />
            <span className="text-sm">Editar</span>
          </Link>

          <hr className="my-2 text-gray" />
          <div
            onClick={() => {
              setSelected();
              onOpenDeleteModal(true);
            }}
            className="button-action flex cursor-pointer  mb-2 py-2 rounded-lg gap-2 hover:bg-ligthred text-darkred">
            <FaTrashAlt size="20" className="ml-2 opacity-70" />
            <span className="text-sm ">Eliminar</span>
          </div>
        </div>
      </div>
    )
  }

  //HandleDonwload(imagen,setPreviewImage)
  
  return (
    <div className="relative shadow bg-white rounded-lg mx-2 pt-6 grid justify-center cursor-default">
      <div className="cursor-pointer w-16 absolute"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <HiOutlineDotsHorizontal size={25} className="w-8 text-lg mx-2 rounded-md" />
        <Menu />
      </div>
      <div className="max-h-64 mt-3 mb-4 w-48 rounded-lg">
        <div className="h-28 rounded-lg bg-gray flex items-center justify-center bg-center bg-no-repeat bg-cover">
          <img
            className="rounded-lg max-h-32"
            src={imageDefault}
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
        <div
          className="flex items-center justify-between rounded-lg gap-11 cursor-default">
          <span className="text-sm">{status ? "Desactivar" : "Activar"}</span>
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
