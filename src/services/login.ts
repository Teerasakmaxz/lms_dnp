import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ConfigService} from "./config";


@Injectable() 
export class Login {
    private baseUrl:any;

    constructor(private config : ConfigService,private http : Http)
    {
        this.baseUrl = this.config.baseUrl; 
        
    }

    loginService(username,password){
        
  return this.http.post(`${this.baseUrl}Login`,{
      username :username,
      password : password
  }).map(this.extractResponse) 
    }
    private extractResponse(res : Response){
        return res.json();
    }

}
