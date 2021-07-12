import React from 'react'
import HeaderBarTitle from '../component/headerbar/tittle'
import HeaderDashboard from '../component/dashboard/header'
import BarStatistics from '../component/dashboard/bar'
import LoadingData from '../component/loading/data'
import ServerError from '../component/error/server'
import { useStatistics } from '../hooks/query'
import Doughnuts from '../component/dashboard/doughnut'

export default function Home() {
    const { data, isLoading, isError } = useStatistics();

    return (
        <div className="h-full ">
            {
                isError ? <ServerError /> :
                    isLoading ? <LoadingData /> :
                        data !== undefined && <>
                            <HeaderBarTitle module="Dashboard" />
                            <div className="w-full flex gap-4">
                                <div className="w-2/12">
                                    <HeaderDashboard plants={data.data.tot_plants} categories={data.data.tot_categories} providers={data.data.tot_providers} shopping={data.data.tot_shopping} />
                                </div>
                                <div className="w-10/12 mt-6">
                                    <BarStatistics compras={data.data.compras_meses} />
                                    <div className="w-full flex gap-5">
                                        <div className="w-1/2">
                                            <Doughnuts dataModule={data.data.categorias} module="categorias"/>
                                        </div>
                                        <div className="w-1/2">
                                        <Doughnuts dataModule={data.data.proveedores}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
            }
        </div>
    )
}
