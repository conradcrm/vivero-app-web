import React from 'react'
import warning from '../../../resources/img/warning.svg'
export default function ServerError() {
    return (
        <div className="w-full grid justify-center h-full">
            <img className="h-80 w-80 m-auto flex justify-center items-center" src={warning}
                  alt="Ha ocurrido un error" />
            <p className="text-darkred text-xl font-semibold text-center">
                Ha ocurrido un error con el servidor, inténtelo más tarde. 
            </p>
        </div>
    )
}