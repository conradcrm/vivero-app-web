import React from 'react'
import not_found from '../resources/img/not_found.svg'
import ButtonGoBack from "../component/buttons/goBack";
import { useHistory } from 'react-router-dom';

export default function NotFound() {
    let history = useHistory();
    return (
        <div className="w-full grid justify-center h-full">
            <ButtonGoBack goBack={history.goBack} />
            <img className="no h-80 w-80 m-auto flex justify-center items-center" src={not_found}
                  alt="Ha ocurrido un error"
                  draggable="false" />
            <p className="text-b_ligth_gray text-2xl font-semibold text-center">
                No se ha encontrado el recurso, regrese o recargue la página.
            </p>
        </div>
    )
}