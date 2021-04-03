import { GenericController } from "./controller/GenericController";
import ProductController from "./controller/ProductController";
import UserController from "./controller/UserController";
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
}

];