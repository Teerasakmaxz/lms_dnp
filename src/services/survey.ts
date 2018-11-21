import { Injectable, OnInit } from '@angular/core';
import { Http,Response} from '@angular/http';
import { ConfigService } from './config';

@Injectable()
export class Survey{
    baseURL : any
    constructor(private config : ConfigService,private http:Http){
        // this.baseURL = 'http://203.154.117.72/lms_dnp/questionnaire_courseapi/index'
        this.baseURL = this.config.baseUrl

    }
    questionnaire(user_id,id){
        return this.http.post(`${this.baseURL}questionnaire_courseapi/index`,{
            id:id,
            user_id:user_id
         
        }).map(this.extractResponse)
    }
    send(user_id,id,val){
        console.log(val);
        
        let data ={}
        data = {
            "contentment":val.contentment,
            "text":val.text
        }
        console.log("==========================================================");
        let g ={
            id:id,
            user_id:user_id,
            choice:data
        }
        
        console.log(g);
        
        return this.http.post(`${this.baseURL}?id=${id}&user_id=${user_id}`,{
            id:id,
            user_id:user_id,
            choice:data
        }).map(this.extractResponse)
    }
    private extractResponse(res : Response){
        return res.json();
    }
}