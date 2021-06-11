import React from 'react'

export default function ItemView({ cantidad, planta }) {
    return (
        <div className="h-12 grid grid-cols-12 bg-white mb-1 font-medium text-sm px-4 items-center">
            <p className="col-span-4 truncate">{planta.nombre}</p>
            <p className="col-span-2">{cantidad}</p>
            <p className="col-span-3">
                {planta.precio_compra.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
            </p>
            <p className="col-span-3">{(cantidad * planta.precio_compra).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            })}
            </p>
        </div>
    )
}
