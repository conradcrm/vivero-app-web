import React from 'react'
import HeaderBar from '../../component/headerbar'
import ProviderList from '../../component/provider/table'
import { useQuery } from '../../hooks/query';
import ServerError from '../../component/error/server'
import LoadingData from '../../component/loading/data';

export default function Provider() {
    const { statusProviders, dataProviders } = useQuery("api/providers", "Providers");
    const data = dataProviders.data
    const status = statusProviders
    return (
        <div className="h-full">
            {
                status === "error" ? <ServerError /> :
                    status === "loading" ? <LoadingData /> :
                        !data.length > 0 ? <p>Aún no hay registros</p> :
                            <>
                                <HeaderBar module="Proveedores" name="Agregar proveedor" route="/provider/create" />
                                <div className="h-full flex justify-center pt-8">
                                    <ProviderList data={data} />
                                </div>
                            </>
            }
        </div>
    )
}
