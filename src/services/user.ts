import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';


import { ConfigService } from './config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class User{


    private baseUrl:any;

    constructor(private config : ConfigService,private http : Http)
    {
        this.baseUrl = this.config.baseUrl; 
    }
    dataForUser(id:any){
        
  return this.http.get(`${this.baseUrl}User/${id}`).map(this.extractResponse)  
    }
    province(){
        return this.http.get(`${this.baseUrl}User/province/province`).map(this.extractResponse)  
    }
    private extractResponse(res : Response){
        return res.json();
    }
} 