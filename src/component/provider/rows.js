import React from "react";
import {FaEdit} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
export default function ItemProvider({razon_social, imagen, telefono, direccion, estado}) {

  return (
    <div className="grid grid-cols-11 bg-white h-16 my-1">
      <div className="col-span-9 grid grid-cols-11 mx-4 text-sm font-normal justify-end items-center">
        <div className="col-span-3 gap-3 flex items-center text-gray-600">
            <div class="h-11 w-11 flex items-center justify-center rounded-3xl overflow-hidden">
				<img src="https://cdn.discordapp.com/embed/avatars/0.png" alt="" />
            </div>
            <p>{razon_social}</p>
        </div>
        <p className="col-span-4 py-3 text-gray-600">{direccion}</p>
        <p className="col-span-2 py-3 text-gray-600">{telefono}</p>
        <div className="col-span-2 text-gray-600 mx-4">
            { estado == 2 ? 
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
          <FaEdit size={20} className="text-icon_gray"/>
          <MdDeleteForever size={22} className="text-mediumred"/>
      </div>
    </div>
  );
}
