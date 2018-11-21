import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController,ViewController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {ConfigService} from '../../services/config';
import {CourseService} from '../../services/course';
import { LearndetailPage } from "../learndetail/learndetail";
import 'rxjs/add/operator/map';



@Component({selector: 'page-directory', templateUrl: 'directory.html'})
export class DirectoryPage implements OnInit {

    title : string;
    subtitle : string;
    g = [1,2,3,4,5,6];
    userdata : any;
    courses : any = []; //Course[]=[];
	public isSearchbarOpened = false; //searchbar

    constructor(public navCtrl : NavController, public config : ConfigService, public navParams : NavParams,
    public courseService : CourseService,public loadingCtrl : LoadingController,public viewController:ViewController,
    ) {

    }

    ngOnInit() {
        let loading = this.loadingCtrl.create({
            spinner: 'ios',
            });
            loading.present();
                this.service(loading)
        this.title = this.config
            .get_translation('course_directory_title');

    }

    ionViewDidLoad() {
        this.viewController.showBackButton(false)
    }

    clickForID(idCourse : any) {
        let data = {
			id: idCourse.course_id,
			name:idCourse.course_title,
            detail:idCourse.course_detail,
            image:idCourse.course_picture,
            questionnaireId:idCourse.questionnaire_id


		}
        this.navCtrl
            .push(LearndetailPage, data)

    }
    changeStatus(status){
        this.isSearchbarOpened = status
      };
      service(loading){
       
        this.courseService
        .getAllCourseCategory()
        .subscribe(res => {
            this.courses = res;
            console.log(this.courses);
            if (loading == null) {
                
            } else {
                loading.dismiss()
            }
           
        });
      }
    getItems(ev) {
        this.service(null)
        let array = []
		// Reset items back to all of the items
	
		// set val to the value of the ev target
		var val = ev.target.value;

		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
            this.courses.forEach((element,i) => {
                array.push(element.course_title)  
                console.log(array);
                              
             this.courses = array.filter((item) => {
                    return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
                  })
            });

		}
	  }
}
