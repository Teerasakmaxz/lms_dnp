import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';


import { ConfigService } from './config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsabilityForUserService{


    private baseUrl:any;
    private observable: Observable<any>;

    constructor(private config : ConfigService,private http : Http)
    {
        this.baseUrl = this.config.baseUrl; 
        
    }

    ngOnInit(){
    
        this.dataForUsability()
        
    }

    dataForUsability(){
        
  return this.http.get(`${this.baseUrl}Usability`).map(this.extractResponse)

       
    }
    dataForInstructionId(id){
       
        return this.http.get(`${this.baseUrl}Usability/${id}`).map(this.extractResponse)
    }

    private extractResponse(res : Response){
        return res.json();
    }
} 