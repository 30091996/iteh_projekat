import { GenericController } from "./controller/GenericController";
import UserController from "./controller/UserController";
export interface Route {
    method: 'get' | 'post' | 'patch' | 'delete',
    route: string,
    action: string,
    controller: GenericController
}
export const Routes: Route[] = [

];