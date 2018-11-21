import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ConfigService} from "./config";


@Injectable()

export class LearnServeice {

    private baseUrl : any;
    public course : any;

    constructor(private http : Http, private config : ConfigService) {

        this.baseUrl = this.config.baseUrl;
    }

    dataForLearn(id : any,userID:any) {

        return this
            .http
            .get(`${this.baseUrl}Learn/getLearn/${id}/${userID}`)
            .map(this.extractResponse)

    }
    postTimeService(user_id,lesson_id,file_id,status){
        return  this.http.post(`${this.baseUrl}Learn/learnfile`,{
            user_id:user_id,
            lesson_id:lesson_id,
            file_id:file_id,
            status:status
        }).map(this.extractResponse)
    }

    private extractResponse(res : Response) {
        return res.json();
    }

}
