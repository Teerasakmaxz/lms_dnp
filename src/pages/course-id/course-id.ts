import {Component} from '@angular/core';
import {NavController, NavParams ,LoadingController} from 'ionic-angular';
import {CourseIdCategory} from '../../services/courseIdCategory'
import {CustomCode} from '../../services/customCode'
import {ConfigService} from '../../services/config'
import { LearndetailPage } from "../learndetail/learndetail";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the CourseIdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-course-id', templateUrl: 'course-id.html'})
export class CourseIdPage {
  courses : any = [];
  detail : any;
	public isSearchbarOpened = false; //searchbar

  constructor(public navCtrl : NavController, public navParams : NavParams, 
    public courseIdCategoryService : CourseIdCategory, public customCode : CustomCode, 
    public config : ConfigService,
    private storage:Storage,  private loadingCtrl: LoadingController,

  ) {}

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      });
      loading.present();
    // this.courseId(this.navParams.get('id'));
    this.storage.get('id').then((val)=>{      
      this.courseId(val[0]);	
      loading.dismiss()		
		})
  }
  courseId(id : any) {
    this.courseIdCategoryService.dataForCourseByUser(id).subscribe(data => {
        this.courses = data
        console.log(data)
      })
  }
 
  clickForID(idCourse : any) {
    console.log(idCourse.course_id)
    let data = {
			id: idCourse.course_id,
			name:idCourse.title,
      detail:idCourse.description,
      image:idCourse.image,
      questionnaireId:idCourse.questionnaire_id

		}
    this.navCtrl
        .push(LearndetailPage, data)

}
changeStatus(status){
  this.isSearchbarOpened = status
}

getItems(ev) {
  this.storage.get('id').then((val)=>{      
    this.courseId(val[0]);	
  })  
  let array = []
// Reset items back to all of the items

// set val to the value of the ev target
var val = ev.target.value;

// if the value is an empty string don't filter the items
if (val && val.trim() != '') {
      this.courses.forEach((element,i) => {        
          array.push(element.title)  
       this.courses = array.filter((item) => {
              return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
      });

}
}
}
