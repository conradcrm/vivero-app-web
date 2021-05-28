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
                        !data.data.length > 0 ? <p className="bg-darkred">Aún no hay registros</p> :
                            <>
                                <HeaderBar module="Plantas" name="Agregar planta" route="/plant/create" />
                                <div className="pt-8">
                                    <Plants data={data.data} />
                                </div>
                            </>
            }

        </div>
    )
}