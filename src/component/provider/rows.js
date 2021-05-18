import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
export default function ItemProvider({ nombre, imagen, telefono, direccion, estado }) {

  return (
    <div className="grid grid-cols-11 bg-white h-16 my-1">
      <div className="col-span-9 grid grid-cols-11 mx-4 text-sm font-normal justify-end items-center">
        <div className="col-span-3 grid grid-cols-3 gap-3 items-center ">
          <div class="col-span-1 flex items-center justify-center bg-center bg-no-repeat bg-cover ">
            <img className="rounded" src="https://i.ibb.co/BHD0ZqY/papop-ruchirawat-1-Q-cg87o-CFc-unsplash.jpg" 
                  alt={imagen} />
          </div>  
          <p className="col-span-2 pr-2 w-full overflow-hidden overflow-ellipsis">{nombre}</p>
        </div>
        <p className="col-span-4 text-gray-600">{direccion}</p>
        <p className="col-span-2 text-gray-600">{telefono}</p>
        <div className="col-span-2 text-gray-600 mx-4">
          {estado === 2 ?
            <div className="relative">
              <p className="bg-ligthred opacity-30 mr-5 py-4 rounded"></p>
              <span className="text-darkred font-semibold text-center absolute -mt-7 ml-6"> Inactivo</span>
            </div>
            :
            <div className="relative">
              <p className="bg-ligthgreen opacity-30 mr-5 py-4 rounded"></p>
              <span className="text-darkgreen font-semibold text-center absolute -mt-7 ml-6"> Activo</span>
            </div>
          }

        </div>
      </div>
      <div className="col-span-2 gap-2 flex justify-end items-center mr-8 text-sm">
        <FaEdit size={20} className="text-icon_gray" />
        <MdDeleteForever size={22} className="text-mediumred" />
      </div>
    </div>
  );
}
