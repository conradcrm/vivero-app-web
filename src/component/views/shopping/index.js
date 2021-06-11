import React from 'react'
import ItemView from './item'

export default function DetailsShopping({ shopping }) {
    console.log(shopping.detalle)
    let total = shopping.detalle.reduce((tot, detalle) => {
        return tot + (detalle.planta.precio_compra * detalle.cantidad);
    }, 0)
    return (
        <div className="mr-3" style={{ width: "48em" }}>
            <h3 className="ml-2 my-2 text-2xl font-bold text-darkgreen">Detalle de compra</h3>
            <div className="mx-2 pt-3 flex justify-between font-bold">
                <p className="text-sm">Folio: <span className="ml-0.5 ">#{shopping.folio_compra}</span></p>
                <p className="text-sm">Proveedor: <span className="ml-0.5 ">{shopping.proveedor.nombre}</span></p>
                <p className="text-sm">Fecha: <span className="ml-0.5 ">{shopping.created_at.split("T")[0]}</span></p>
            </div>
            <div className="bg-ligth_gray shadow-sm mx-2 mt-6 rounded-lg" style={{ height: "20em" }}>
                <div className="h-12 grid grid-cols-12 text-white tracking-wider font-semibold rounded-tl-lg rounded-tr-lg px-4 text-sm items-center bg-darkgreen">
                    <p className="col-span-4">Planta</p>
                    <p className="col-span-2">Cantidad</p>
                    <p className="col-span-3">compra</p>
                    <p className="col-span-3">Subtotal</p>

                </div>
                <div className=" bg-ligth_gray text-sm overflow-y-auto" style={{ maxHeight: "15em" }}>
                    {
                        shopping.detalle.map((detalle) =>
                            <ItemView
                                {...detalle}
                                key={detalle.id_detallecompra}/>)
                    }
                </div>
                <div className="h-16 grid pt-5 grid-cols-12 bg-white text-sm px-4 items-center font-bold">
                    <p className="col-start-9 col-end-12">
                        <span className="mr-4">Total :</span>{total.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}</p>
                </div>
            </div>
        </div>
    )
}
