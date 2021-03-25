import { GenericController } from "./controller/GenericController";
import UserController from "./controller/UserController";
export interface Route {
    method: 'get' | 'post' | 'patch' | 'delete',
    route: string,
    action: string,
    controller: GenericController
}
export const Routes: Route[] = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}];