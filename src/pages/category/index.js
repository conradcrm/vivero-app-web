import React from 'react'
import Categories from '../../component/category'
import HeaderBar from '../../component/headerbar'
import ServerError from '../../component/error/server'
import LoadingData from '../../component/loading/data';
import useCategories from '../../hooks/query';

export default function Category() {
    const query = useCategories();
    let data = undefined;
    if(!query.isLoading && !query.isError && query.data){
        if(query.data.data !== undefined){
            data = query.data.data;
        }
        else{
            data= query.data;
        }
    }
    return (
        <div className="h-full">
             {
                query.isError ? <ServerError /> :
                query.isLoading ? <LoadingData /> :
                            <>
                                <HeaderBar module="Categorías" name="Agregar categoría" route="/category/create" />
                                {!data.length > 0 ? <p>Aún no hay registros</p> :
                                <div className="pt-8">
                                    <Categories data={data} />
                                </div>}
                            </>
            }
        </div>
    )
}