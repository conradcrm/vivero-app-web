import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ToggleButton from "../buttons/toggle";
import imageDefault from "../../resources/modules/category.jpg"
import { Link } from "react-router-dom";
import Select from "react-dropdown-select";
export default function ItemShopping({
  id_proveedor,
  nombre, 
  imagen, 
  telefono, 
  correo, 
  direccion, 
  estado, 
  onOpenModal, 
  setSelected, 
  isActivate, 
  setisActivate, 
  onOpenDeleteModal, 
  statusShop }) {


  let status = estado <= 1;
  // let total = shopping.detalle.reduce((tot, detalle) => {
  //   return tot + detalle.planta.precio_compra;
  // }, 0)

  let statuss = status;
  let estados = statuss == 1 ? "Completado" : statuss == 2 ? "Pendiente" : "Cancelado"
  const color = statuss == 1 ? "#CCFFCB" : statuss == 2 ? "#F5F6F8" : "#FFD2D2"
  const colorText = statuss == 1 ? "darkgreen" : statuss == 2 ? "#000" : "darkred"
  
  const optionStatus = [
    { label: "Completado" },
    { label: "Pendiente" },
    { label: "Cancelado" },
  ];

  const styleSelect = {
    fontSize: "12px",
    width: "8rem",
    padding: "0 5 0 5",
    borderRadius: "10px",
    fontWeight: "600",
    backgroundColor: color,
    color: colorText,
    border: "none",
  };
  return (
    <div className="grid grid-cols-11 bg-white h-16 my-1">
      <div className="col-span-9 grid grid-cols-11 mx-4 text-sm font-normal justify-end items-center">
        <div className="col-span-7 grid grid-cols-2 items-center">
          <div className="grid grid-cols-3 gap-3 items-center">
           <p className="col-span-2 pr-2 w-full overflow-hidden overflow-ellipsis">{nombre}</p>
          </div>
          <p className="text-gray-600 pl-4">{direccion}</p>
        </div>
        <p className="col-span-2 text-gray-600">{telefono}</p>

        <div className="col-span-2 mx-4">
          <Select
            options={optionStatus}
            id="select-status"
            color="#000"
            valueField="label"
            style={styleSelect}
            className="mb-5 text-lg font-bold"
            values={optionStatus.filter(
              (opt) => opt.label === "Completado"
            )}
            onChange={(value) => {
              statusShop({"status":value[0].label});
              setSelected();
              onOpenModal(true);
            }}
          />
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
