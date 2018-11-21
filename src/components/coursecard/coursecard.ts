import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigService } from '../../services/config';
import { DirectoryPage } from '../../pages/directory/directory'
import { CustomCode } from "../../services/customCode";



@Component({
  selector: 'coursecard',
  templateUrl: 'coursecard.html'
})
export class Coursecard implements OnInit{

    directoryPage= DirectoryPage;
    active:string='';
	@Input('course') course;
	public topic: any;
	public title : any;
    public detail : any;
    public image : any = 'assets/imgs/noimage.png';
    element:any

  
    
    constructor(
        private config:ConfigService,
        private customCode : CustomCode,
    ) {
   
        }

    ngOnInit(){
        var element1 = document.createElement('div');  

            this.image = this.course.course_picture
            this.topic = this.course.faq_THtopic
            this.title = this.course.course_title
            this.detail = this.customCode.getDecodeHTMLEntities(this.course.course_detail)
            element1.innerHTML = this.detail 
            this.element = element1.textContent
    }
    goToLearnDetail(id:any){
        console.log(id.course_id);
        
        let data ={
            id:id
        }
    // this.navCtr.push(LearndetailPage,data)
    }
}
