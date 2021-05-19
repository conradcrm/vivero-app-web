import React from 'react'
import warning from '../../../resources/img/warning.svg'
export default function ServerError() {
    return (
        <div className="w-full h-full grid justify-center">
            <img className="h-96 w-96 m-auto flex justify-center items-center" src={warning}
                  alt="Ha ocurrido un error" />
            <span className="text-darkgreen text-xl font-semibold text-center">Ha ocurrido un error.</span>
        </div>
    )
}