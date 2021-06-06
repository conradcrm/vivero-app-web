import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProviderForm from '../../component/forms/provider'
import CategoryForm from '../../component/forms/category'
import PlantForm from '../../component/forms/plant'
import ShoppingForm from '../../component/forms/shopping'
import CategoryEditForm from '../../component/forms/category/edit'
import PlantEditForm from '../../component/forms/plant/edit'
import ProviderEditForm from '../../component/forms/provider/edit'


export default function FormRoutes() {
    return (
        <Switch>
            <Route path="/category/create" component={CategoryForm}/>
            <Route path="/category/edit/:id" component={CategoryEditForm}/>
            <Route path="/plant/create" component={PlantForm}/>
            <Route path="/plant/edit/:id" component={PlantEditForm}/>
            <Route path="/provider/create" render={() => <ProviderForm mode="create"/>}/>
            <Route path="/provider/edit/:id" component={ProviderEditForm}/>
            <Route path="/compra/create" render={() => <ShoppingForm mode="create"/>}/>
        </Switch>
    )
}