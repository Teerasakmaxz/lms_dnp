import { Injectable, OnInit } from '@angular/core';
import { Http,Response} from '@angular/http';
import { ConfigService } from './config';


@Injectable()
export class UpdateTime{
    baseURL : any
    constructor(private config : ConfigService,private http:Http){
        // this.baseURL = 'http://203.154.117.72/lms_dnp/'
        this.baseURL = this.config.baseUrl
    }
    saveTimeExam(user_id,lesson_id,time){
        return this.http.post(`${this.baseURL}Questionapi/SaveTimeExam`,
        {
            user_id:user_id,
            lesson_id:lesson_id ,
            time:time
        })
        .map(this.extractResponse)
    }
    saveTimeExamCouser(user_id,course_id,time){
        return this.http.post(`${this.baseURL}Coursequestionapi/SaveTimeExam`,
        {
            user_id:user_id,
            course_id:course_id ,
            time:time
        })
        .map(this.extractResponse)
    }
  private extractResponse(res : Response){
        return res.json();
    }

}