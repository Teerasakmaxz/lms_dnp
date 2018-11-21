import { Injectable, OnInit ,} from '@angular/core';
import { Http,Response, RequestOptions} from '@angular/http';
import { ConfigService } from './config';


@Injectable()
export class TestQuestion{
    baseURL : any
    options:any
    constructor(private config : ConfigService,private http:Http){
        // this.baseURL = 'http://203.154.117.72/lms_dnp/'
        this.baseURL = this.config.baseUrl

    }
    test(user_id,lesson_id){
        return this.http.post(`${this.baseURL}Questionapi/index`,{
            user_id  :user_id,
            lesson_id:lesson_id
        }).map(this.extractResponse)
    }
    nextTemp(user_id,lesson_id,actionEvnt){
        return this.http.post(`${this.baseURL}Questionapi/index`,{
            user_id  :user_id,
            lesson_id:lesson_id,
            actionEvnt:actionEvnt
        }).map(this.extractResponse)
    }
    updateTemp(user_id,lesson_id,idQ,actionEvnt,idx_now,last_quest,idChoice,typeChoice){  
        console.log(user_id);
        console.log(lesson_id);
        console.log(idQ);
        console.log(actionEvnt);
        console.log(idx_now);
        console.log(last_quest);
        console.log(idChoice);
        console.log(typeChoice);
        let ChoiceTemp = {};
        if(typeChoice == 4 || typeChoice == 1 ){
            ChoiceTemp[idQ] = idChoice;
        }else{
            ChoiceTemp[idQ] = [idChoice];
        }
        let type ={};
        type[idQ] = [typeChoice]
        return this.http.post(`${this.baseURL}Questionapi/index`,{
            user_id  :user_id,
            lesson_id:lesson_id,
            actionEvnt:actionEvnt,
            idx_now:idx_now,
            last_quest:last_quest,
            Choice:ChoiceTemp,
            Question_type:type
        }).map(this.extractResponse)
    }
    pretest(user_id,lesson_id){
            return this.http.post(`${this.baseURL}Questionapi/PreExams`,{
            user_id  :user_id,
            lesson_id:lesson_id,
        }).map(this.extractResponse)
    }

    testPostCourse(user_id,course_id){
        return this.http.post(`${this.baseURL}Coursequestionapi/index`,{
            user_id  :user_id,
            course_id:course_id
        }).map(this.extractResponse)
    }

    nextTempPostCourse(user_id,course_id,actionEvnt){
        return this.http.post(`${this.baseURL}Coursequestionapi/index`,{
            user_id  :user_id,
            course_id:course_id,
            actionEvnt:actionEvnt
        }).map(this.extractResponse)
    }
    updateTempPostCourse(user_id,course_id,idQ,actionEvnt,idx_now,last_quest,idChoice,typeChoice){                
        let ChoiceTemp = {};
        
        if(typeChoice == 4 || typeChoice == 1 ){
            ChoiceTemp[idQ] = idChoice;
        }else{
            ChoiceTemp[idQ] = [idChoice];
        }
        let type ={};
        type[idQ] = [typeChoice]
        return this.http.post(`${this.baseURL}Coursequestionapi/index`,{
            user_id  :user_id,
            course_id:course_id,
            actionEvnt:actionEvnt,
            idx_now:idx_now,
            last_quest:last_quest,
            Choice:ChoiceTemp,
            Question_type:type
        }).map(this.extractResponse)
    }
    pretestPostCourse(user_id,course_id){
        return this.http.post(`${this.baseURL}Coursequestionapi/PreExams`,{
            user_id  :user_id,
            course_id:course_id,
        }).map(this.extractResponse)
    }
  private extractResponse(res : Response){
        return res.json();
    }
}

