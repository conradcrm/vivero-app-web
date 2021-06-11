import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Select from "react-dropdown-select";
import { BiDetail } from 'react-icons/bi';
export default function ItemShopping({
  folio_compra,
  detalle,
  proveedor,
  created_at,
  updated_at,
  estado,
  onOpenModal,
  setSelected,
  onOpenDeleteModal,
  statusShop }) {

  let total;
  if (detalle !== undefined) {
    total = detalle.reduce((tot, detalle) => {
      return tot + detalle.planta.precio_compra;
    }, 0)
  }

  let estados = estado === 1 ? "Completado" : estado === 2 ? "Pendiente" : "Cancelado";
  let color = estado === 1 ? "#CCFFCB" : estado === 2 ? "#fff8a5" : "#FAE1DD";
  let colorText = estado === 1 ? "darkgreen" : estado === 2 ? "#f48f00" : "#D30000";

  const optionStatus = [
    { label: "Completado" },
    { label: "Pendiente" },
    { label: "Cancelado" },
  ];

  const styleSelect = {
    fontSize: "12px",
    width: "8rem",
    padding: "0 8 0 8",
    borderRadius: "10px",
    fontWeight: "600",
    backgroundColor: color,
    color: colorText,
    border: "none",
    margin: 0,
  };

  return (
    <div className="grid grid-cols-12 h-20 my-1 justify-end items-center bg-white font-semibold">
      <div className="col-span-10 h-14 grid grid-cols-12 mx-4 items-center" style={{ fontSize: "0.84rem", lineHeight: "1.25rem" }}>
        <p className="col-span-1 flex items-center "><span className="bg-icon_gray rounded-lg p-2">#{folio_compra}</span></p>
        <p className="col-span-4">{proveedor.nombre}</p>
        <p className="col-span-2">{created_at.split("T")[0]}</p>
        <p className="col-span-2">
          {total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <div className="col-span-2">
          {
            estados === "Pendiente" ?
              <Select
                options={optionStatus}
                id="select-status"
                color="#000"
                valueField="label"
                style={styleSelect}
                values={optionStatus.filter((opt) => opt.label === estados)}
                onChange={(value) => {
                  statusShop({ "status": value[0].label });
                  setSelected();
                  onOpenModal(true);
                }}
              /> :
                <div className="py-2 text-center cursor-default" style={styleSelect}>
                  {estados}
                </div>
          }
        </div>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <div className="w-2/3 grid grid-cols-3 items-end">
          <button className="p-2 hover:bg-gray rounded-lg grid justify-center"
            onClick={() => {
              setSelected();
              onOpenDeleteModal(true);
            }}>
            <BiDetail size={21} className="opacity-70" />
          </button>
          <Link
            className="contents"
            to={{ pathname: "/provider/edit" }}>
            <div className="p-2  hover:bg-gray rounded-lg grid justify-center">
              <FaEdit size={19} className="opacity-60 mb-0.5 ml-1" />
            </div>
          </Link>
          <button className="p-2 grid justify-center hover:bg-ligthred rounded-lg"
            onClick={() => {
              setSelected();
              onOpenDeleteModal(true);
            }}>
            <MdDeleteForever size={21} className="text-darkred" />
          </button>
        </div>
      </div>
    </div>
  );
}
