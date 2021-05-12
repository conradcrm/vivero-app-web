import React,{useState} from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [selected, setSelected] = useState("HOME")

  return (
    <div className="bg-white col-span-1 grid grid-cols-1 gap-2 place-content-between">
      <div className="">
        <nav className="mt-10">
          <Link to="/" 
          onClick={()=> setSelected("HOME")}
          className={`flex items-center mt-5 py-2 px-8 border-r-4 border-white ${selected === "HOME" ? "" : ""}`}>
            <span className="mx-4 font-medium">Dashboard</span>
          </Link>

          <Link to="/products" 
          onClick={()=> setSelected("PRODUCTS")}
          className={`flex items-center mt-5 py-2 px-8 border-r-4 border-white ${selected==="PRODUCTS" ? "" : ""}`}>
            <span className="mx-4 font-medium">Productos</span>
          </Link>

          <Link to="/categories" 
          onClick={()=> setSelected("CATEGORIES")}
          className={`flex items-center mt-5 py-2 px-8 border-r-4 border-white ${selected==="CATEGORIES" ? "" : ""}`}>
            <span className="mx-4 font-medium">Categorías</span>
          </Link>

          <Link to="/provider" onClick={()=> setSelected("PROVIDERS")}
          className={`flex items-center mt-5 py-2 px-8 border-r-4 border-white  ${selected==="SERVICES" ? "" : ""}`}>
            <span className="mx-4 font-medium">Proveedores</span>
          </Link>
        </nav>
      </div>
      <Link to="/" className="flex items-center h-16 py-2 px-8">
            <span className="mx-4 font-medium">Cerrar sesión</span>
          </Link>
    </div>
  );
}
