import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CategoryForm from '../../component/forms/category'
import PlantForm from '../../component/forms/plant'
import ProviderForm from '../../component/forms/provider'

export default function FormRoutes() {
    return (
        <Switch>
            <Route path="/category/create" component={CategoryForm}/>
            <Route path="/plant/create" component={PlantForm}/>
            <Route path="/provider/create" component={ProviderForm}/>
        </Switch>
    )
}