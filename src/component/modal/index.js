import React from 'react'
import Loading from '../loading'

export default function ModalMessage({ title, message, onClose, update, isLoading, isActivate, cancel }) {
    return (
        <div className="px-8">
            <div className="py-4 flex space-x-4 md:flex-row flex-col md:text-left text-center items-center">
                <div className="">
                    <h2 className={`text-xl font-semibold tracking-wide ${isActivate ? "text-darkred" : " text-darkgreen"}`}>
                        {title}
                    </h2>
                    <p className="text-b_ligth_gray pt-4">
                        {message}
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <button
                    onClick={()=> {onClose();}}
                    className=" bg-white px-3 py-1 border-2 border-b_ligth_gray rounded-lg hover:bg-gray">
                    Cancelar
                </button>
                <button
                    onClick={update}
                    disabled={isLoading}
                    className={`px-4 py-1 border-2 inline-flex  text-white rounded-lg  
                    ${isActivate ? "text-darkred bg-mediumred hover:bg-darkred" : " text-ligthgreen bg-ligthgreen hover:bg-darkgreen"}`}>
                    {isLoading ?
                        <>
                            <Loading className="" color={"white"} size={22} />
                            <p className="ml-1">{isActivate ? "Desactivando ...": "Activando ..."}</p>
                        </> :
                        <>{isActivate ? "Desactivar": "Activar"}</>
                    }
                </button>
            </div>
        </div>
    )
}
