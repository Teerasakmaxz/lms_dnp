import { Injectable, OnInit } from '@angular/core';
import { Http,Response} from '@angular/http';
import { ConfigService } from './config';


@Injectable()
export class Repassword{
    baseURL : any
    constructor(private config : ConfigService,private http:Http){
        this.baseURL = this.config.baseUrl
    }

    repassword(email){
        return this.http.post(`${this.baseURL}User/forgot_password`,{
            email:email
        }).map(this.extractResponse)
    }

  private extractResponse(res : Response){
        return res.json();
    }
}