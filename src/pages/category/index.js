import React from 'react'
import Categories from '../../component/category'
import HeaderBar from '../../component/headerbar'
import ServerError from '../../component/error/server'
import LoadingData from '../../component/loading/data';
import { useQuery } from 'react-query';
import { getCategories } from '../../hooks/query';

export default function Category() {
    const { data, isLoading, isError } = useQuery('categories', getCategories);
    return (
        <div className="h-full">
            {
                isError ? <ServerError /> :
                    isLoading ? <LoadingData /> :
                            <>
                                <HeaderBar module="Categorías" name="Agregar categoría" route="/category/create" />
                                {!data.data.length > 0 ? <p>Aún no hay registros</p> :
                                <div className="pt-8">
                                    <Categories data={data.data} />
                                </div>}
                            </>
            }
        </div>
    )
}