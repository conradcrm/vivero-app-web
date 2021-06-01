import React from 'react'
import HeaderBar from '../../component/headerbar'
import ProviderList from '../../component/provider/table'
import ServerError from '../../component/error/server'
import LoadingData from '../../component/loading/data';
import { useQuery } from 'react-query';
import { getProvider } from '../../hooks/query';

export default function Provider() {
    const { data, isLoading, isError } = useQuery('providers', getProvider);
    return (
        <div className="h-full">
            {
                isError ? <ServerError /> :
                    isLoading ? <LoadingData /> :
                            <>
                                <HeaderBar module="Proveedores" name="Agregar proveedor" route="/provider/create" />
                                {!data.data.length > 0 ? <p>Aún no hay registros</p> :
                                <div className="max-h-full flex justify-center pt-8">
                                    <ProviderList data={data.data} />
                                </div>}
                            </>
            }
        </div>
    )
}
