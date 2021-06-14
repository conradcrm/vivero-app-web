import React from 'react'
import Loading from '../loading'

export default function ModalChangeStatus({ title, message, action, isLoading, isActivate, cancel, type }) {

    return (
        <div className="px-8">
            <div className="py-4 flex space-x-4 md:flex-row flex-col md:text-left text-center items-center">
                <div className="">
                    <h2 className={`text-xl font-semibold tracking-wide ${isActivate ? "text-darkgreen" : "text-darkred"}`}>
                        {title}
                    </h2>
                    <p className="text-b_ligth_gray pt-4">
                        {message}
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <button
                    onClick={cancel}
                    className=" bg-white px-3 py-1 focus:outline-none border-2 border-b_ligth_gray rounded-lg transition duration-150 ease-in-out transform hover:scale-105">
                    Cancelar
                </button>
                <button
                    onClick={action}
                    disabled={isLoading}
                    className={`px-4 py-1 border-2 inline-flex focus:outline-none  text-white rounded-lg transition duration-150 ease-in-out transform hover:scale-105
                    ${isActivate ? " text-ligthgreen bg-ligthgreen hover:bg-darkgreen" : "text-darkred bg-mediumred"}`}>
                    {isLoading ?
                        <>
                            <Loading className="" color={"white"} size={22} />
                            <p className="ml-1">
                                {
                                   type!==undefined ? "Aceptar" : isActivate ? "Activando ..." : "Desactivando ..."
                                }</p>
                        </> :
                        <>{type!==undefined ? "Aceptar" : isActivate ? "Activar" : "Desactivar"}</>
                    }
                </button>
            </div>
        </div>
    )
}
