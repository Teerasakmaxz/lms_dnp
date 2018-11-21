import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {CourseCategory} from "../models/coursecategory";
import {FullCourseCategory} from "../models/coursecategory";
import {ConfigService} from "./config";

@Injectable()
export class CourseCategoryService {

    fullcategories : FullCourseCategory[] = [];
    courseCategories : CourseCategory[] = [];

    private observable : Observable < any >; //Tracks request in progress

    private baseUrl : any

    constructor(private http : Http, private config : ConfigService) {

        this.baseUrl = this.config.baseUrl

    }

    private extractData(response : Response) {
        let body = response.json();
        return body || {};
    }

    getAllCourseCategories(forceRefresh?: boolean) {

        if (!this.courseCategories.length || forceRefresh) {
            this
                .http
                .get(`${this.baseUrl}Category`)
                .map(this.extractData)
                .subscribe(categories => {
                    this.courseCategories = this.courseCategories
                });
        }
        return this.courseCategories;
    }

   
}
