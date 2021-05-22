import React from "react";
import ItemProvider from "./rows";

export default function ProviderList({ data }) {
  return (
    <div className="bg-white h-5/6 w-full flex justify-center">
      <div className="bg-gray w-full rounded-md">
        <div className="grid grid-cols-11 text-sm font-semibold">
          <div className="col-span-9 grid grid-cols-11 mx-4 text-sm">
            <p className="col-span-3  py-3">Nombre</p>
            <p className="col-span-4 py-3">Dirección</p>
            <p className="col-span-2 py-3">Teléfono</p>
            <p className="col-span-2 py-3 pl-4">Estado</p>
          </div>
          <div className="col-span-2 py-3 ml-20">Acciones</div>
        </div>
        <div className="h-screen bg-ligth_gray text-sm mt-2">
          {
            data.map((provider) => <ItemProvider {...provider} key={provider.id_proveedor} />)
          }
        </div>
      </div>
    </div>
  );
}
