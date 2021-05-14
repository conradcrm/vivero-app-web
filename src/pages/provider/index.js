import React from 'react'
import HeaderBar from '../../component/headerbar'
import ProviderList from '../../component/provider/table'

export default function Provider() {
    return (
        <div className="h-full">
            <HeaderBar module="Proveedores" name= "Agregar proveedor" isHidden={false} route="/provider/create"/>
            <div className="h-full flex justify-center pt-8">
                <ProviderList/>
            </div>
        </div>
    )
}
