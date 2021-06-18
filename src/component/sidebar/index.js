import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AiFillShopping } from 'react-icons/ai';
import { BiColumns } from "react-icons/bi";
import { MdContacts } from "react-icons/md";
import {
  RiDashboardLine,
  RiHandCoinFill,
  RiPlantFill,
  RiFullscreenExitLine
} from "react-icons/ri";

import profile_default from '../../resources/profile/profile.svg';
import { useAuth } from "../../context/Auth";
import { notify } from "../notification";
import storage from '../../firebase';
import { getPhoto, getUserCurrent, setPhotoUser } from "../../helpers/helper-auth";

export default function Sidebar() {
  let history = useHistory();
  let location = useLocation();
  let route = location.pathname.split("/")[1].toUpperCase();
  let path = route.length > 0 ? route : "DASHBOARD";
  const [selected, setSelected] = useState(path)
  const { logout } = useAuth();
  const user = getUserCurrent();
  const photo = getPhoto();
  async function handleDonwload() {
    let ref = storage.ref(`/profile/${user.email}`);
    try {
      await ref.getDownloadURL().then((url) => {
        setPhotoUser(url)
      })
    } catch (error) {
      console.log('No encontrada', error)
    }
  }

  useEffect(() => {
    if (user === undefined) {
      handleDonwload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function closeSession() {
    try {
      await logout();
      history.push('/');
    } catch (error) {
      notify("error", `Ha ocurrido un error, inténtelo más tarde. ${error}`);
    }
  }

  const NavModules = () => {
    return (
      <nav className="mt-6">
        <hr className="text-gray pb-3" />
        <Link to="/"
          onClick={() => setSelected("DASHBOARD")}
          className={`${selected === "DASHBOARD" ? "text-mediumgreen" : "text-gray-20"}`}>
          <p className="grid grid-cols-3 gap-4 hover:bg-gray justify-center items-center py-2 text-center">
            <span className="col-span-1 flex justify-end">
              <RiDashboardLine size={20} className="" />
            </span>
            <span className="col-span-2  text-left font-medium">Dashboard</span>
          </p>
        </Link>

        <Link to="/providers" onClick={() => setSelected("PROVIDERS")}
          className={`${selected === "PROVIDERS" ? "text-mediumgreen" : "text-gray-20"}`}>
          <p className="grid grid-cols-3 gap-4 hover:bg-gray justify-center items-center py-2 text-center">
            <span className="col-span-1 flex justify-end">
              <RiHandCoinFill size={20} />
            </span>
            <span className="col-span-2  text-left font-medium">Proveedores</span>
          </p>
        </Link>

        <Link to="/categories"
          onClick={() => setSelected("CATEGORIES")}
          className={`${selected === "CATEGORIES" ? "text-mediumgreen" : "text-gray-20"}`}>
          <p className="grid grid-cols-3 gap-4 hover:bg-gray justify-center items-center py-2 text-center">
            <span className="col-span-1 flex justify-end">
              <BiColumns size={20} />
            </span>
            <span className="col-span-2  text-left font-medium">Categorías</span>
          </p>
        </Link>

        <Link to="/plants"
          onClick={() => setSelected("PLANTS")}
          className={`${selected === "PLANTS" ? "text-mediumgreen" : "text-gray-20"}`}>
          <p className="grid grid-cols-3 gap-4 hover:bg-gray justify-center items-center py-2 text-center">
            <span className="col-span-1 flex justify-end">
              <RiPlantFill size={20} />
            </span>
            <span className="col-span-2  text-left font-medium">Plantas</span>
          </p>
        </Link>

        <Link to="/compras"
          onClick={() => setSelected("COMPRAS")}
          className={`${selected === "COMPRAS" ? "text-mediumgreen" : "text-gray-20"}`}>
          <p className="grid grid-cols-3 gap-4 hover:bg-gray justify-center items-center py-2 text-center">
            <span className="col-span-1 flex justify-end">
              <AiFillShopping size={20} />
            </span>
            <span className="col-span-2  text-left font-medium">Compras</span>
          </p>
        </Link>
      </nav>

    )
  }

  const Profile = () => {
    return (
      <nav className="mt-8">
        <hr className="text-gray pb-3" />
        <Link to="/profile"
          onClick={() => setSelected("PROFILE")}
          className={`${selected === "PROFILE" ? "text-mediumgreen" : "text-gray-20"}`}>
          <p className="grid grid-cols-3 gap-4 hover:bg-gray justify-center items-center py-2 text-center">
            <span className="col-span-1 flex justify-end">
              <MdContacts size={20} />
            </span>
            <span className="col-span-2 text-left font-medium">Perfil</span>
          </p>
        </Link>
      </nav>
    )
  }

  return (
    <div className="bg-white col-span-1 max-h-full">
      <div className="h-1/8">
        <div className="w-full flex justify-center my-3">
          <div className="rounded-full w-16 h-16 p-3 flex items-center justify-center z-50 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: (photo && `url(${photo})`) || `url(${profile_default})` }}>
          </div>
        </div>
        <p className="text-center font-semibold text-name">
          {user.name}
        </p>
      </div>

      <div className="h-4/5 overflow-y-hidden" style={{ maxHeight: "28.5em" }}>
        <NavModules />
        <Profile />

      </div>
      <div className="grid items-center">
        <hr className="text-gray" />
        <button onClick={closeSession} className="">
          <p className="grid grid-cols-3 gap-4 hover:bg-gray justify-center items-center py-2 text-center">
            <span className="col-span-1 flex justify-end">
              <RiFullscreenExitLine size={20} />
            </span>
            <span className="col-span-2 text-left text-gray-20 font-semibold">Cerrar sesión</span>
          </p>
        </button>
      </div>
      <style>
        {`
          .text-name{
            color: rgb(120,120,120);
          } 
          .text-gray-20{
            color: rgba(40, 36, 28, 0.6);
            font-size: 0.925rem;
            line-height: 1.55rem;
            
          }
        `}
      </style>
    </div>
  );
}
