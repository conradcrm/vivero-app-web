import React from 'react'
import HeaderBar from '../../component/headerbar'

export default function Plant() {
    return (
        <div>
            <HeaderBar module="Plantas" name= "Agregar planta" isHidden={false} route="/plant/create"/>
        </div>
    )
}