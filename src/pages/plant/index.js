import React from 'react'
import ServerError from '../../component/error/server'
import HeaderBar from '../../component/headerbar'
import LoadingData from '../../component/loading/data'
import Plants from '../../component/plants';
import { useQuery } from '../../hooks/query';

export default function Plant() {
    const { statusPlant, dataPlant } = useQuery("api/plants", "Plant");
    const data = dataPlant.data
    const status = statusPlant
    return (
        <div className="h-full">
            {
                status === "error" ? <ServerError /> :
                    status === "loading" ? <LoadingData /> :
                        !data.length > 0 ? <p className="bg-darkred">Aún no hay registros</p> :
                            <>
                                <HeaderBar module="Plantas" name="Agregar planta" route="/plant/create" />
                                <div className="pt-8">
                                    <Plants data={data} />
                                </div>
                            </>
            }

        </div>
    )
}