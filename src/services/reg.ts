import { Injectable, OnInit } from '@angular/core';
import { Http,Response} from '@angular/http';
import { ConfigService } from './config';


@Injectable()
export class Reg{
    baseURL : any
    constructor(private config : ConfigService,private http:Http){
        this.baseURL = this.config.baseUrl
    }

    register(firstname,lastname,identification,email,typeprefix,groupJob,province,position,address,company,zipcode,teluser){
        return this.http.post(`${this.baseURL}User/register`,{
            firstname:firstname,
            lastname:lastname,
            identification:identification,
            email:email,
            phone:teluser,
            province:province,
            address:address,
            zipcode:zipcode,
            position:position,
            company:company,
            title_id:typeprefix

        }).map(this.extractResponse)
    }

  private extractResponse(res : Response){
        return res.json();
    }
}