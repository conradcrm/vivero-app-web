import React from 'react'
import ServerError from '../../component/error/server'
import HeaderBar from '../../component/headerbar'
import LoadingData from '../../component/loading/data'
import Plants from '../../component/plants';
import { useQuery } from 'react-query';
import { getPlants } from '../../hooks/query';

export default function Plant() {
    const { data, isLoading, isError } = useQuery('plants', getPlants);
    
    return (
        <div className="h-full">
            {
                isError ? <ServerError /> :
                    isLoading ? <LoadingData /> :
                            <>
                                <HeaderBar module="Plantas" name="Agregar planta" route="/plant/create" />
                                {!data.data.length > 0 ? <p className="">Aún no hay registros</p> :
                                <div className="pt-8">
                                    <Plants data={data.data} />
                                </div>}
                            </>
            }
        </div>
    )
}