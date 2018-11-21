import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';


import { ConfigService } from './config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FaqService{


    private baseUrl:any;
    private observable: Observable<any>;

    constructor(private config : ConfigService,private http : Http)
    {
        this.baseUrl = this.config.baseUrl; 
        
    }

    ngOnInit(){
    
        this.dataForFaq()
        
    }

    dataForFaq(){
        
  return this.http.get(`${this.baseUrl}Faq`).map(this.extractResponse)

       
    }

    private extractResponse(res : Response){
        return res.json();
    }
} 