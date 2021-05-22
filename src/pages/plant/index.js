import React from 'react'
import ServerError from '../../component/error/server'
import HeaderBar from '../../component/headerbar'
import LoadingData from '../../component/loading/data'
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
                        !data.length > 0 ? <p>Aún no hay registros</p> :
                            <>
                                <HeaderBar module="Plantas" name="Agregar planta" route="/plant/create"/>
                                <div className="h-full flex justify-center pt-8">

                                </div>
                            </>
            }

        </div>
    )
}