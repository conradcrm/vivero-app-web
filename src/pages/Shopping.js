import React from 'react'
import HeaderBar from '../component/headerbar'
import ShoppingList from '../component/shopping/table'
import NoData from '../component/error/nodata'
import ServerError from '../component/error/server'
import LoadingData from '../component/loading/data';
import { useShopping } from '../hooks/query';

export default function Shopping() {
    const query = useShopping();
    return (
        <div className="h-full">
            {
                query.isError ? <ServerError /> :
                    query.isLoading ? <LoadingData /> :
                        query.data !== undefined && <>
                            <HeaderBar module="Compras" name="Registrar compra" route="/compra/create" />
                            {
                                !query.data.data.length > 0 ? <NoData/> :
                                    <div className="max-h-full pt-8">
                                        <ShoppingList data={query.data.data} />
                                    </div>
                            }
                        </>
            }
        </div>
    )
}