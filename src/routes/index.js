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
import NotFound from '../pages/NotFound';

export function LogoutRoutes() {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route component={Login} default />
            <Route path="*" component={NotFound} />
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
                <Route path="/providers" component={Provider} exact />
                <Route path="/categories" component={Category} exact />
                <Route path="/plants" component={Plant} exact />
                <Route path="/notifications" component={Notification} />
                <Route path="/compras" component={Shopping} exact />
                <Route path="/profile" component={Profile} exact />
                <Route path="*" component={NotFound} />
            </Switch>
        </Layout>
    )
}

function FormRoutes() {
    return (
        <LayoutForm>
            <Switch>
                <Route path="/category/create" component={CategoryForm} exact />
                <Route path="/category/edit/:id" component={CategoryEditForm} exact />
                <Route path="/plant/create" component={PlantForm} exact />
                <Route path="/plant/edit/:id" component={PlantEditForm} exact />
                <Route path="/provider/create" component={ProviderForm} exact />
                <Route path="/provider/edit/:id" component={ProviderEditForm} exact />
                <Route path="/compra/create" component={ShoppingForm} />
                <Route path="*" component={NotFound} />
            </Switch>
        </LayoutForm>
    )
}