 import React, { useState } from 'react'
import ServerError from '../component/error/server'
import NoData from '../component/error/nodata'
import HeaderBar from '../component/headerbar'
import LoadingData from '../component/loading/data'
import Plants from '../component/plants';
import { usePlantsPage } from '../hooks/query';

export default function Plant() {
    const [page, setPage] = useState(1)
    const { data, isLoading, isError } = usePlantsPage(page);
    
    return (
        <div className="h-full">
            {
                isError ? <ServerError /> :
                    isLoading ? <LoadingData /> :
                        data !== undefined && <>
                            <HeaderBar module="Plantas" name="Agregar planta" route="/plant/create" page={data.data} />
                            {!data.data.data.length > 0 ? <NoData /> :
                                <Plants data={data.data} setPage={setPage} page={page}/>
                            }
                        </>
            }
        </div>
    )
}