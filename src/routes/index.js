import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from "../pages/home";
import Plant from "../pages/plant";
import Category from "../pages/category";
import Provider from "../pages/provider";
import Profile from '../pages/profile';
import Notification from '../pages/notification';
import Shopping from '../pages/shopping';

export default function ModuleRoutes() {
    return (
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/providers" component={Provider}/>
            <Route path="/categories" component={Category}/>
            <Route path="/plants" component={Plant}/>
            <Route path="/employees" render={()=> <p className="h-full flex justify-center font-bold items-center text-3xl text-darkgreen">Próximamente</p>}/>
            <Route path="/notifications" component={Notification}/>
            <Route path="/compras" component={Shopping}/>
            <Route path="/profile" component={Profile}/>
        </Switch>
    )
}