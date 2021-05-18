import React from "react";
import ItemProvider from "./rows";
import { useQuery } from "../../hooks";

export default function ProviderList() {
  const { status, data } = useQuery("api/providers");
    
  return (
    <>
      <div className="bg-gray w-full rounded-md">
        <div className="grid grid-cols-11 text-sm font-semibold">
            <div className="col-span-9 grid grid-cols-11 mx-4 text-sm">
                <p className="col-span-3  py-3 text-gray-600">Razon social</p>
                <p className="col-span-4 py-3 text-gray-600">Dirección</p>
                <p className="col-span-2 py-3 text-gray-600">Teléfono</p>
                <p className="col-span-2 py-3 pl-4 text-gray-600">Estado</p>
            </div>
            <div className="col-span-2 grid grid-cols-10 mx-3 text-sm"></div>
        </div>
        <div className="h-screen bg-ligth_gray text-sm mt-2">
            { 
            status === "fetched" && (
                data.data.length > 0 ?
                data.data.map((provider) => <ItemProvider {...provider} key={provider.id_proveedor}/>) : "Sin registros"
            )
            }
        </div>
      </div>
    </>
  );
}