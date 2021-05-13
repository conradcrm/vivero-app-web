import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from "../pages/home";
import Plant from "../pages/plant";
import Category from "../pages/category";
import Provider from "../pages/provider";

export default function ModuleRoutes() {
    return (
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/products" component={Plant}/>
            <Route path="/categories" component={Category}/>
            <Route path="/provider" component={Provider}/>
        </Switch>
    )
}