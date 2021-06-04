import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ToggleButton from "../buttons/toggle";
import imageDefault from "../../resources/modules/category.jpg"
import { Link } from "react-router-dom";
export default function ItemProvider({ id_proveedor, nombre, imagen, telefono, correo, direccion, estado, onOpenModal, setSelected, isActivate, setisActivate }) {
  let status = estado <= 1;

  return (
    <div className="grid grid-cols-11 bg-white h-16 my-1">
      <div className="col-span-9 grid grid-cols-11 mx-4 text-sm font-normal justify-end items-center">
        <div className="col-span-7 grid grid-cols-2 items-center">
          <div className="grid grid-cols-3 gap-3 items-center">
            <div className="col-span-1 flex items-center justify-center bg-center bg-no-repeat bg-cover ">
              <img
                className="rounded-lg max-h-32"
                src={imagen}
                alt={nombre}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = imageDefault;
                }}
              />
            </div>
            <p className="col-span-2 pr-2 w-full overflow-hidden overflow-ellipsis">{nombre}</p>
          </div>
          <p className="text-gray-600 pl-4">{direccion}</p>
        </div>
        <p className="col-span-2 text-gray-600">{telefono}</p>
        <div className="col-span-2 text-gray-600 mx-4">
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
          {/* {status ?
            <div className="relative">
              <p className="bg-ligthgreen opacity-30 mr-5 py-4 rounded"></p>
              <span className="text-darkgreen font-semibold text-center absolute -mt-7 ml-6"> Activo</span>
            </div> :
            <div className="relative">
              <p className="bg-ligthred opacity-30 mr-5 py-4 rounded"></p>
              <span className="text-darkred font-semibold text-center absolute -mt-7 ml-6"> Inactivo</span>
            </div>
          } */}
        </div>
      </div>
      <div className="col-span-2 flex justify-end items-center mr-8 text-sm">
        <div className="flex justify-between items-center text-sm mt-1 rounded-lg my-2">
          <Link to={{
            pathname: "/provider/edit",
            data: {
              id_proveedor: id_proveedor,
              nombre: nombre,
              telefono: telefono,
              direccion: direccion,
              correo: correo,
              imagen: imagen,
              estado: estado
            },
          }}
          >
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
