import { Injectable, OnInit } from '@angular/core';
import { Http,Response} from '@angular/http';
import { ConfigService } from './config';


@Injectable()
export class Video{
    baseURL : any
    constructor(private config : ConfigService,private http:Http){
        this.baseURL = this.config.baseUrl
    }

    video(){
        return this.http.get(`${this.baseURL}video`).map(this.extractResponse)
    }

  private extractResponse(res : Response){
        return res.json();
    }
}