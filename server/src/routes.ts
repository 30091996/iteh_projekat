import CartController from "./controller/CartController";
import { GenericController } from "./controller/GenericController";
import ProductCategoryController from "./controller/ProductCategoryController";
import ProductController from "./controller/ProductController";
import UserController from "./controller/UserController";
import WeatherController from "./controller/WeatherController";
export interface Route {
    method: 'get' | 'post' | 'patch' | 'delete',
    route: string,
    action: string,
    controller: GenericController
}
export const Routes: Route[] = [{
    action: 'login',
    controller: UserController,
    method: 'post',
    route: '/login'
}, {
    action: 'register',
    controller: UserController,
    method: 'post',
    route: '/register'
}, {
    action: 'logout',
    controller: UserController,
    method: 'post',
    route: '/logout'
}, {
    action: 'check',
    controller: UserController,
    method: 'post',
    route: '/check'
},
{
    action: 'all',
    controller: ProductController,
    method: 'get',
    route: '/product'
},
{
    action: 'update',
    controller: ProductController,
    method: 'patch',
    route: '/product/:id'
},
{
    action: 'all',
    controller: ProductCategoryController,
    method: 'get',
    route: '/category'
},
{
    action: 'create',
    controller: CartController,
    method: 'post',
    route: '/cart'
},
{
    action: 'all',
    controller: CartController,
    method: 'get',
    route: '/cart'
}, {
    method: "get",
    route: "/weather",
    controller: WeatherController,
    action: "all"
}

];