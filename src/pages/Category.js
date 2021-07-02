import React from 'react'
import Categories from '../component/category'
import HeaderBar from '../component/headerbar'
import ServerError from '../component/error/server'
import NoData from '../component/error/nodata'
import LoadingData from '../component/loading/data';
import { useCategories } from '../hooks/query';


export default function Category() {
    const query = useCategories();
    return (
        <div className="h-full">
            {
                query.isError ? <ServerError /> :
                    query.isLoading ? <LoadingData /> :
                        query.data !== undefined &&
                        <>
                            <HeaderBar module="Categorías" name="Agregar categoría" route="/category/create" />
                            {!query.data.data.length > 0 ? <NoData /> :
                                <Categories data={query.data.data} />
                            }
                        </>

            }
        </div>
    )
}