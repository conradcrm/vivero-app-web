import React from 'react'

export default function ModalMessageBack({ title, message, onClose, action }) {
    return (
        <div className="px-8">
            <div className="py-4 flex space-x-4 md:flex-row flex-col md:text-left text-center items-center">
                <div className="">
                    <h2 className={`text-xl font-semibold tracking-wide text-darkred"}`}>
                        {title}
                    </h2>
                    <p className="text-b_ligth_gray pt-4">
                        {message}
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <button
                    onClick={() => onClose()}
                    className=" bg-white px-3 focus:outline-none py-1 border-2 border-b_ligth_gray rounded-lg transition duration-150 ease-in-out transform hover:scale-105">
                    Cancelar
                </button>
                <button
                    onClick={()=>action()}
                    className="px-4 py-1 border-2 focus:outline-none text-white inline-flex rounded-lg bg-mediumred transition duration-150 ease-in-out transform hover:scale-105">
                    Aceptar
                </button>
            </div>
        </div>
    )
}
