import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ToggleButton from "../buttons/toggle";
import { Link } from "react-router-dom";
export default function ItemProvider(shopping,{onOpenModal, setSelected, isActivate, setisActivate }) {
  let status = shopping.estado <= 1;
  let total = shopping.detalle.reduce((tot, detalle)=>{
    return tot + detalle.planta.precio_compra;
  },0)

  return (
    <div className="grid grid-cols-11 bg-white h-16 my-1">
      <div className="col-span-9 grid grid-cols-11 mx-4 text-sm font-normal justify-end items-center">
          <p className="col-span-1 py-3">{shopping.folio_compra}</p>
          <p className="col-span-3 py-3">{shopping.proveedor.nombre}</p>
          <p className="col-span-2 py-3">{shopping.detalle.length}</p>
          <p className="col-span-2 py-3">{total}</p>
        <div className="col-span-1 py-3">
          <p className="mb-1"> {status ? "Activo":"Inactivo"}</p>
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
          <Link to={{pathname: "/provider/edit"}}>
            <div className="p-2 hover:bg-gray rounded-3xl flex outline-none border-none focus:outline-none opacity-80 hover:opacity-100">
              <FaEdit size={19} className="text-b_icon_gray opacity-40 cursor-pointer" />
            </div>
          </Link>
        </div>
        <button className="p-2 hover:bg-ligthred rounded-3xl flex outline-none border-none focus:outline-none opacity-80 hover:opacity-100">
          <MdDeleteForever size={22} className="text-mediumred" />
        </button>
      </div>
    </div>
  );
}
