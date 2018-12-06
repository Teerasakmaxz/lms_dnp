import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController,MenuController } from 'ionic-angular';
import { DirectoryPage } from '../directory/directory';
import { CourseService } from '../../services/course';
import { ConfigService } from '../../services/config';
import { CourseCategory } from '../../models/course';
import { LearndetailPage } from "../learndetail/learndetail";
import { Time } from "../../services/time";
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{
	isLoggedIn: boolean = false;
	categories:any
	categoryPage = DirectoryPage;


 

	public isSearchbarOpened = false; //searchbar
	constructor(public navCtrl: NavController,
		private courseService: CourseService, 
		private loadingCtrl: LoadingController,
		private config:ConfigService,public time :Time,
		private storage:Storage,
		public memu :MenuController) {

		this.memu.enable(true,'mainmenu')
		this.storage.get('id').then((val)=>{
			
		})

	}
		slider = [
			{
				image : "assets/images/banner.png"
			}
		]
	ngOnInit() {
		let loading = this.loadingCtrl.create({
			spinner: 'ios',
		  });
			loading.present();
			this.courseService.getAllCourseCategory().subscribe(featured =>{
				console.log(featured);
					this.categories = featured;
					loading.dismiss()
			});

		 
	}

	changeStatus(status){
			this.isSearchbarOpened = status
	};

	goToDirectory(){
		this.navCtrl.push(DirectoryPage)
	}

	goToLearnDetail(category){
		console.log(category);
		
		let data = {
			id: category.course_id,
			name:category.course_title,
			detail:category.course_detail,
			image:category.course_picture,
			questionnaireId:category.questionnaire_id
		}
		this.navCtrl.push(LearndetailPage, data)
	}
	
}