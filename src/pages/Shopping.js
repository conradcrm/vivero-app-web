import React, { useState } from 'react'
import HeaderBar from '../component/headerbar'
import ShoppingList from '../component/shopping/table'
import NoData from '../component/error/nodata'
import ServerError from '../component/error/server'
import LoadingData from '../component/loading/data';
import { useShoppingPage } from '../hooks/query';

export default function Shopping() {
    const [page, setPage] = useState(1)
    const { data, isLoading, isError } = useShoppingPage(page);
    
    return (
        <div className="h-full">
            {
                isError ? <ServerError /> :
                    isLoading ? <LoadingData /> :
                        data !== undefined && <>
                            <HeaderBar module="Compras" name="Registrar compra" route="/compra/create" page={data.data} />
                            {
                                !data.data.data.length > 0 ? <NoData /> :
                                    <div className="mt-10 overflow-y-hidden">
                                        <ShoppingList data={data.data} setPage={setPage} page = {page} />
                                    </div>
                            }
                        </>
            }
        </div>
    )
}