import {Injectable, OnInit} from '@angular/core';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {ConfigService} from "./config";
import {Observable} from 'rxjs/Observable';

@Injectable()

export class CourseIdCategory {

    private baseUrl : any;
    public course : any;

    constructor(private http : Http, private config : ConfigService) {

        this.baseUrl = this.config.baseUrl;
        // console.log(this.baseUrl)
    }

    dataForCourse(id : any) {

        return this
            .http
            .get(`${this.baseUrl}CourseOnline/cate_id/${id}`)
            .map(this.extractResponse)

    }

    dataForCourseByUser(id : any) {
        return this
            .http
            .get(`${this.baseUrl}CourseOnline/getCourseID/${id}`)
            .map(this.extractResponse)

    }
    courseOnline(user_id,id){
        return this.http.get(`${this.baseUrl}CourseOnline/getid/${id}/${user_id}`)
        .map(this.extractResponse)
    }

    private extractResponse(res : Response) {
        return res.json();
    }

}
