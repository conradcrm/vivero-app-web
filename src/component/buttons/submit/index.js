import React from 'react'
import Loading from '../../loading'

export default function SubmitButton({ mode, isLoading }) {
    return (
        <button
            type="submit"
            className="bg-mediumgreen block text-lg w-full mt-8 py-2 rounded text-white font-semibold hover:bg-darkgreen"
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
