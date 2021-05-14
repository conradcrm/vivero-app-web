import React,{useState} from "react";
import { Link } from "react-router-dom";
import {RiDashboardLine} from "react-icons/ri";
import {BsFillPersonFill} from "react-icons/bs";
import {RiPlantFill} from "react-icons/ri";
import {BiColumns} from "react-icons/bi";
import {RiTeamFill} from "react-icons/ri";
import {IoNotifications} from "react-icons/io5"
import {ImProfile} from "react-icons/im"

export default function Sidebar() {
  const [selected, setSelected] = useState("DASHBOARD")

  return (
    <div className="bg-white col-span-1 grid grid-cols-1 gap-2 place-content-between">
      <div className="">

        <nav className="mt-3">
          <Link to="/" 
          onClick={()=> setSelected("DASHBOARD")}
          className={`flex items-center mt-5 py-2 px-8 border-r-4 border-white ${selected === "DASHBOARD" ? "text-t_green" : "text-b_ligth_gray"}`}>
            <RiDashboardLine/>
            <span className="mx-4 font-medium ">Dashboard</span>
          </Link>

          <Link to="/provider" onClick={()=> setSelected("PROVIDERS")}
          className={`flex items-center mt-5 py-2 px-8 border-r-4 border-white  ${selected==="PROVIDERS" ? "text-t_green" : "text-b_ligth_gray"}`}>
            <BsFillPersonFill/>
            <span className="mx-4 font-medium">Proveedores</span>
          </Link>

          <Link to="/categories" 
          onClick={()=> setSelected("CATEGORIES")}
          className={`flex items-center mt-5 py-2 px-8 border-r-4 border-white ${selected==="CATEGORIES" ? "text-t_green" : "text-b_ligth_gray"}`}>
            <BiColumns/>
            <span className="mx-4 font-medium">Categorías</span>
          </Link>

          <Link to="/products" 
          onClick={()=> setSelected("PRODUCTS")}
          className={`flex items-center mt-5 py-2 px-8 border-r-4 border-white ${selected==="PRODUCTS" ? "text-t_green" : "text-b_ligth_gray"}`}>
            <RiPlantFill/>
            <span className="mx-4 font-medium">Productos</span>
          </Link>

          <Link to="/employees" 
          onClick={()=> setSelected("EMPLOYEES")}
          className={`flex items-center mt-5 py-2 px-8 border-r-4 border-white ${selected==="EMPLOYEES" ? "text-t_green" : "text-b_ligth_gray"}`}>
            <RiTeamFill/>
            <span className="mx-4 font-medium">Empleados</span>
          </Link>


        </nav>

        <nav className="mt-20">
        <Link to="/" 
          onClick={()=> setSelected("NOTIFICATIONS")}
          className={`flex items-center mt-5 py-2 px-8 border-r-4 border-white ${selected === "NOTIFICATIONS" ? "text-t_green" : "text-b_ligth_gray"}`}>
            <IoNotifications/>
            <span className="mx-4 font-medium ">Notificaciones</span>
          </Link>

          <Link to="/" 
          onClick={()=> setSelected("PROFILE")}
          className={`flex items-center mt-5 py-2 px-8 border-r-4 border-white ${selected === "PROFILE" ? "text-t_green" : "text-b_ligth_gray"}`}>
            <ImProfile/>
            <span className="mx-4 font-medium ">Perfil</span>
          </Link>
          </nav>
      </div>
      <Link to="/" className="flex items-center h-16 py-2 px-8">
            <span className="mx-4 font-medium">Cerrar sesión</span>
          </Link>
    </div>
  );
}
