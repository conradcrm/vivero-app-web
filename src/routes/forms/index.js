import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProviderForm from '../../component/forms/provider'
import CategoryForm from '../../component/forms/category'
import PlantForm from '../../component/forms/plant'
import ShoppingForm from '../../component/forms/shopping'
import CategoryEditForm from '../../component/forms/category/edit'

export default function FormRoutes() {
    return (
        <Switch>
            <Route path="/category/create" render={() => <CategoryForm mode="create"/>}/>
            <Route path="/category/edit/:id" component={CategoryEditForm}/>
            <Route path="/plant/create" render={() => <PlantForm mode="create"/>}/>
            <Route path="/plant/edit" render={(props) => <PlantForm selectedPlant={props.location.data} mode="edit"/>}/>
            <Route path="/provider/create" render={() => <ProviderForm mode="create"/>}/>
            <Route path="/provider/edit" render={(props) => <ProviderForm selectedProvider={props.location.data} mode="edit"/>}/>
            <Route path="/compra/create" render={() => <ShoppingForm mode="create"/>}/>
        </Switch>
    )
}