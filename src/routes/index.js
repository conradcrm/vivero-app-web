import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Layout, LayoutForm } from "../layout";

import Login from '../pages/Login';

import Home from "../pages";
import Plant from "../pages/Plant";
import Category from "../pages/Category";
import Provider from "../pages/Provider";
import Profile from '../pages/Account';
import Notification from '../pages/Notification';
import Shopping from '../pages/Shopping';

import ProviderForm from '../component/forms/provider'
import CategoryForm from '../component/forms/category'
import PlantForm from '../component/forms/plant'
import ShoppingForm from '../component/forms/shopping'
import CategoryEditForm from '../component/forms/category/edit'
import PlantEditForm from '../component/forms/plant/edit'
import ProviderEditForm from '../component/forms/provider/edit'

export function LogoutRoutes() {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route component={Login} default />
        </Switch>
    );
}

export function Modules() {
    let location = useLocation();
    let route = location.pathname;
    
    return (
        <>
            {
                !route.includes('create') && !route.includes('edit') ?
                    <ModuleRoutes /> :
                    <FormRoutes />
            }
        </>
    )
}

function ModuleRoutes() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} default />
                <Route path="/providers" component={Provider} />
                <Route path="/categories" component={Category} exact />
                <Route path="/plants" component={Plant} />
                <Route path="/employees" render={() => <p className="h-full flex justify-center font-bold items-center text-3xl text-darkgreen">Próximamente</p>} />
                <Route path="/notifications" component={Notification} />
                <Route path="/compras" component={Shopping} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </Layout>
    )
}

function FormRoutes() {
    return (
        <LayoutForm>
            <Switch>
                <Route path="/category/create" component={CategoryForm} exact />
                <Route path="/category/edit/:id" component={CategoryEditForm} />
                <Route path="/plant/create" component={PlantForm} />
                <Route path="/plant/edit/:id" component={PlantEditForm} />
                <Route path="/provider/create" render={() => <ProviderForm mode="create" />} />
                <Route path="/provider/edit/:id" component={ProviderEditForm} />
                <Route path="/compra/create" render={() => <ShoppingForm mode="create" />} />
            </Switch>
        </LayoutForm>
    )
}