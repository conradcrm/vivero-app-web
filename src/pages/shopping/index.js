import React from 'react'
import HeaderBar from '../../component/headerbar'
//import ShoppingList from '../../component/shopping/table'
import ServerError from '../../component/error/server'
import LoadingData from '../../component/loading/data';
import { useQuery } from 'react-query';
import { getShopping } from '../../hooks/query';

export default function Shopping() {
    const { data, isLoading, isError } = useQuery('shopping', getShopping);
    return (
        <div className="h-full">
            {
                isError ? <ServerError /> :
                    isLoading ? <LoadingData /> :
                            <>
                                <HeaderBar module="Compras" name="Registrar compra" route="/compra/create" />
                                {
                                    !data.data.length > 0 ? <p>Aún no ha realizado ninguna compra.</p> :
                                    <div className="h-full flex justify-center pt-8">
                                     <ShoppingList data={data.data} />
                                </div>
                                }
                            </>
            }
        </div>
    )
}