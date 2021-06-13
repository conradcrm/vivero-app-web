import React from 'react'
import HeaderBar from '../component/headerbar'
import ProviderList from '../component/provider/table'
import ServerError from '../component/error/server'
import LoadingData from '../component/loading/data';
import { useProviders } from '../hooks/query';

export default function Provider() {
    let query = useProviders();
    return (
        <div className="h-full">
            {
                query.isError ? <ServerError /> :
                    query.isLoading ? <LoadingData /> :
                        query.data !== undefined && query.data.data !== undefined && <>
                            <HeaderBar module="Proveedores" name="Agregar proveedor" route="/provider/create" />
                            {!query.data.data.length > 0 ? <p>Aún no hay registros</p> :
                                <div className="max-h-full pt-8">
                                    <ProviderList data={query.data.data} />
                                </div>}
                        </>
            }
        </div>
    )
}
