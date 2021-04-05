import { GenericController } from "./GenericController";
import { Request, Response } from "express";
import axios from 'axios'
export class WeatherController implements GenericController {

    async all(request: Request, response: Response): Promise<any> {
        response.json((await axios.get('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civillight&output=json')).data.dataseries[0]);
    }

}
const controller = new WeatherController();
export default controller;