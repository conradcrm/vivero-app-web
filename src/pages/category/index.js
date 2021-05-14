import React from 'react'
import Categories from '../../component/category'
import HeaderBar from '../../component/headerbar'

export default function Category() {
    return (
        <div className="h-full">
            <HeaderBar module="Categoría" name= "Agregar categoría" isHidden={false} route="/category/create"/>
            <div className="h-96 flex justify-center pt-8">
                <Categories/>    
            </div>
        </div>
    )
}
