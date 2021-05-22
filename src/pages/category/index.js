import React from 'react'
import Categories from '../../component/category'
import HeaderBar from '../../component/headerbar'
import ServerError from '../../component/error/server'
import LoadingData from '../../component/loading/data';
import { useQuery } from '../../hooks/query';

export default function Category() {
    const { statusCategories, dataCategories } = useQuery("api/categories", "Categories");
    const data = dataCategories.data
    const status = statusCategories
    return (
        <div className="h-full">
            {
                status === "error" ? <ServerError /> :
                    status === "loading" ? <LoadingData /> :
                        !data.length > 0 ? <p>Aún no hay registros</p> :
                            <>
                                <HeaderBar module="Categoría" name="Agregar categoría" route="/category/create" />
                                <div className="h-96 flex justify-center pt-8">
                                    <Categories data={data} />
                                </div>
                            </>
            }
        </div>
    )
}