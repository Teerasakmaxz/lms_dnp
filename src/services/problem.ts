import { Injectable, OnInit } from '@angular/core';
import { Http,Response} from '@angular/http';
import { ConfigService } from './config';


@Injectable()
export class Problem{

    public baseURL:any

    constructor(public config:ConfigService,private http : Http){

        this.baseURL = this.config.baseUrl

    }
    postDataProblem(name,surname,email,tel,subject,detail,type,ansSubject,
        ansDetail,answer,createBy,createDate,updateBy,updateDate,active,contac_course){
        return this.http.post(`${this.baseURL}Contactus`,{
            name:name,
            surname:surname,
            email:email,
            tel:tel,
            subject:subject,
            detail:detail,
            type:type,
            ansSubject:ansSubject,
            ansDetail:ansDetail,
            answer:answer,
            createBy:createBy,
            createDate:createDate,
            updateBy:updateBy,
            updateDate:updateDate,
            active:active,
            contac_course:contac_course
        }).map(this.extractResponse)
    }
    getContact(id:any){
        return this.http.get(`${this.baseURL}Contactus/getAll/${id}`).map(this.extractResponse)
    }
    private extractResponse(res : Response){
        return res.json();
    }
}