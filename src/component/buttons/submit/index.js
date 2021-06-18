import React from 'react'
import Loading from '../../loading'

export default function SubmitButton({ mode, isLoading }) {
    return (
        <button
            type="submit"
            className={`bg-mediumgreen block text-lg focus:outline-none w-full mt-8 py-2 rounded text-white font-semibold bg-opacity-90 transition duration-150 ease-in-out transform hover:scale-105
            ${isLoading ? "opacity-50 cursor-wait ":" hover:bg-darkgreen hover:opacity-100"}`}
            disabled={isLoading}
        >
            {isLoading ?
                <>
                    <Loading color={"white"} size={25} />
                    <p className="ml-2">{mode === "create" ? "Guardando ..." : "Actualizando ..."}</p>
                </> :
                <>{mode === "create" ? "Guardar" : "Actualizar"}</>
            }
        </button>
    )
}
