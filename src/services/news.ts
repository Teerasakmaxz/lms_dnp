import { Injectable, OnInit } from '@angular/core';
import { Http,Response} from '@angular/http';
import { ConfigService } from './config';


@Injectable()
export class News{
    private baseUrl:any;
    constructor(private config : ConfigService,private http : Http)
    {
        this.baseUrl = this.config.baseUrl; 
        
    }
    dataForNew(){     
        return this.http.get(`${this.baseUrl}New`).map(this.extractResponse)   
          }

          dataForNewId(id){
              return this.http.get(`${this.baseUrl}New/${id}`).map(this.extractResponse)
          }
          
          private extractResponse(res : Response){
            return res.json();
        }

}