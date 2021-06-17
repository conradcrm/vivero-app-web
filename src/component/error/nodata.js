import React from 'react'
import no_data from '../../resources/img/no_data.svg'

export default function NoData() {
    return (
        <div className="w-full grid justify-center">
            <img className="h-72 w-72 mt-20 m-auto flex justify-center items-center" src={no_data}
                alt="Ha ocurrido un error"
                draggable="false" />
            <p className="text-darkgreen mt-12 text-xl font-semibold text-center">
                Aún no existen registros.
            </p>
        </div>
    )
}