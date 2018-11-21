import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ConfigService} from "./config";


@Injectable()

export class Lesson {

    private baseUrl : any;
    public course : any;

    constructor(private http : Http, private config : ConfigService) {

        this.baseUrl = this.config.baseUrl;
    }

    dataForLesson(id,user_id) {
        return this
            .http
            .get(`${this.baseUrl}Lesson/courseID/${id}/${user_id}`)
            .map(this.extractResponse)

    }

    private extractResponse(res : Response) {
        return res.json();
    }

}
