import { Injectable, OnInit } from '@angular/core';
import { Http, 
    Response
} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

import { ConfigService } from "./config";

@Injectable() 
export class CourseService implements OnInit{  

	private baseUrl:string;

    constructor(private http:Http,
        private config:ConfigService) {
        
        this.baseUrl = this.config.baseUrl; 

    }
  	
    ngOnInit(){
        
        
    }
    
    getAllCourseCategory(){
        
            return this
                .http
                .get(`${this.baseUrl}CourseOnline`)
                .map(this.extractResponse)
    
        }
    
        private extractResponse(res : Response) {
            return res.json();
        }
    }
          
