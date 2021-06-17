import React from 'react'
import ServerError from '../component/error/server'
import NoData from '../component/error/nodata'
import HeaderBar from '../component/headerbar'
import LoadingData from '../component/loading/data'
import Plants from '../component/plants';
import { usePlants } from '../hooks/query';

export default function Plant() {
    const query = usePlants();
    return (
        <div className="h-full">
            {
                query.isError ? <ServerError /> :
                    query.isLoading ? <LoadingData /> :
                        query.data !== undefined && <>
                            <HeaderBar module="Plantas" name="Agregar planta" route="/plant/create" />
                            {!query.data.data.length > 0 ? <NoData/> :
                                <div className="pt-8">
                                    <Plants data={query.data.data} />
                                </div>}
                        </>
            }
        </div>
    )
}