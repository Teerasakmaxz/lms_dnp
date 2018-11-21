import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ConfigService} from "./config";


@Injectable()

export class LoadFile {

    private baseUrl : any;
    public course : any;

    constructor(private http : Http, private config : ConfigService) {

      this.baseUrl = 'http://203.154.117.72/lms_dnp/'
        
    }

    printCertificate(user_id,course_id) {

        return this
            .http
            .post(`${this.baseUrl}Course/PrintCertificateapi`,{
                user_id:user_id,
                course_id:course_id
            })
            .map(this.extractResponse)

    }

    private extractResponse(res : Response) {
        return res.json();
    }

}
