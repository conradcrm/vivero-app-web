import React from 'react'

export default function HeaderDashboard({ plants, categories, providers, shopping }) {

    const Items = ({ module, total }) => {
        return (
            <div className="bg-white my-6 h-28 w-full rounded-md shadow-sm flex justify-center text-center">
                <p className="mt-5">
                    <span className="block mb-4 font-poppins font-semibold uppercase ">{module}</span>
                    <span className="text-3xl mt-6 text-darkgreen font-semibold">{total.toLocaleString('en-US')}</span>
                </p>
            </div>
        )
    }

    return (
        <div className="">
            <div className="justify-between w-full">
                <Items module="proveedores" total={providers} />
                <Items module="categorías" total={categories} />
                <Items module="plantas" total={plants} />
                <Items module="compras" total={shopping} />
            </div>
        </div>
    )
}
