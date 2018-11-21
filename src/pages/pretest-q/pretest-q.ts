import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { TestQuestion } from "../../services/testQuestion";
import { PretestPage } from "../pretest/pretest";
import { PosttestPage } from "../posttest/posttest";

/**
 * Generated class for the PretestQPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pretest-q',
  templateUrl: 'pretest-q.html',
})
export class PretestQPage {
  dataForPre:any
  dataLesson :any
  title:any
  type:any
  topic:any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage:Storage,private testQuestion:TestQuestion,private alertCtrl: AlertController) {
      console.log(this.navParams.get('topic'));
      
  }

  ionViewDidLoad() {
    this.storage.get('id').then(val =>{
    if (this.navParams.get('type') == 'lesson') {
      this.testQuestion.pretest(val[0],this.navParams.get('id')).subscribe(data =>{ 
        console.log(data);
        

        if (data.status) {
          this.type="บทเรียน"
          this.topic= this.navParams.get('topic')
          this.title = data.lesson.title
          this.dataForPre = data     
          this.dataLesson = data.lesson  
        } else {
          let alert = this.alertCtrl.create({
            title: 'แจ้งแตือน',
            message: data.msg,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.navCtrl.pop()
                }
              }
            ]
          });
          alert.present();
        }     
      })
    } else {
      
      this.testQuestion.pretestPostCourse(val[0],this.navParams.get('id')).subscribe(data =>{ 
        console.log(data);
        

        if (data.status) {
          this.title = data.course.course_title
          this.type="หลักสูตร"
          this.topic= this.navParams.get('topic')
          this.dataForPre = data     
          this.dataLesson = data.course  
        } else {
          let alert = this.alertCtrl.create({
            title: 'แจ้งแตือน',
            message: data.msg,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.navCtrl.pop()
                }
              }
            ]
          });
          alert.present();
        }     
      })

    }
  

    })
  }
  actionTest(){
    if (this.navParams.get('type') == 'lesson') {
      let dataFor ={
        idLesson : this.navParams.get('id')
      }  
      this.navCtrl.push(PretestPage,dataFor)
    }else{
      let dataFor ={
        idCourse : this.navParams.get('id')
      }  
      this.navCtrl.push(PosttestPage,dataFor)
    }
       

  }
  back(){
    this.navCtrl.pop()
  }
}
