import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ToggleButton from "../buttons/toggle";
import { Link } from "react-router-dom";
export default function ItemProvider({ id_proveedor, nombre, imagen, telefono, correo, direccion, estado, onOpenModal, setSelected, isActivate, setisActivate, onOpenDeleteModal }) {
  let status = estado===undefined || estado === 1;
  
  return (
    <div className="grid grid-cols-11 my-1 h-16 bg-white font-semibold" style={{height:"4.5rem"}}>
      <div className="col-span-9 grid grid-cols-11 mx-4 items-center" style={{fontSize: "0.84rem",lineHeight: "1.25rem"}}>
        <div className="col-span-7 grid grid-cols-2">
          <p className="py-3">{nombre}</p>
          <p className="py-3 pl-4">{direccion}</p>
        </div>
        <p className="col-span-2">{telefono}</p>
        <div className="col-span-2 ml-4">
          <p className="mb-1"> {status ? "Activo" : "Inactivo"}</p>
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
      <div className="col-span-2 flex justify-end items-center mr-8 text-sm">
        <div className="flex justify-between items-center text-sm mt-1 rounded-lg my-2">
          <Link to={`/provider/edit/${id_proveedor}`}>
            <div className="p-2 hover:bg-gray rounded-3xl flex outline-none border-none focus:outline-none opacity-80 hover:opacity-100">
              <FaEdit size={19} className="text-b_icon_gray opacity-40 cursor-pointer" />
            </div>
          </Link>
        </div>
        <button
          onClick={() => {
            setSelected();
            onOpenDeleteModal(true);
          }}
          className="p-2 hover:bg-ligthred rounded-3xl flex outline-none border-none focus:outline-none opacity-80 hover:opacity-100">
          <MdDeleteForever size={22} className="text-mediumred" />
        </button>
      </div>
    </div>
  );
}