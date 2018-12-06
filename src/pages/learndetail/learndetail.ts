

import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,Slides,ViewController,LoadingController,AlertController,Platform} from 'ionic-angular';
import { Lesson } from "../../services/lesson";
import { CourseIdCategory } from "../../services/courseIdCategory";
import { ConfigService } from "../../services/config";
import { CustomCode } from "../../services/customCode";
import { Storage } from "@ionic/storage";
import { EvaluatePage } from '../../pages/evaluate/evaluate';
import { PosttestPage } from "../posttest/posttest";
import { TestQuestion } from "../../services/testQuestion";
import { PretestQPage } from "../pretest-q/pretest-q";
import { LoadFile } from "../../services/loadfile";
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from "@ionic-native/file";
import { DocumentViewer } from "@ionic-native/document-viewer";
import {  Time } from "../../services/time";


/**
 * Generated class for the LearndetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-learndetail',
  templateUrl: 'learndetail.html',
})
export class LearndetailPage {
  @ViewChild('mySlider') slider: Slides;
  public name:any
   dataFor:any
   public detail:any
   number:any
   image:any
   questionnaireId:any
   testPost:any
   id:any
   lessonAllStatus:any
   statusCourseTest:any
   course_score:any
   appDetail:any
   element:any
   detailDate:any
   score:any


  
  constructor(private time:Time,public navCtrl: NavController,
     public navParams: NavParams ,
     private lesson : Lesson,
     public config : ConfigService,
    public custom:CustomCode,
    private viewController :ViewController,
    private storage:Storage,
    private loadingCtrl: LoadingController,
    private courseIdCategory:CourseIdCategory,
    private alertCtrl: AlertController,
    private testQuestion:TestQuestion,
    private loadFile:LoadFile,
    private transfer: FileTransfer,
    public platform: Platform,
    private file: File,
    
    private documentViewer:DocumentViewer
    ) {
      
   this.lessonID(this.navParams.get('id'))
   this.storage.get('id').then(val =>{
    this.courseIdCategory.courseOnline(val[0],this.navParams.get('id')).subscribe(data =>{
     let end =  this.time.getDecodeHTMLTime(data[0].course_date_end)
     let start = this.time.getDecodeHTMLTime(data[0].course_date_start)
      this.detailDate =`ระยะเวลาการเรียน ${data[0].course_day_learn} วัน (${start[0]} / ${start[1]} / ${start[2]} - ${end[0]} / ${end[1]} / ${end[2]})`           
      this.course_score = data[0].course_score
      this.score = data[0].course_score.score_past
      this.id =data[0].course_id
      this.name = data[0].course_title
      this.image = data[0].course_picture
      this.questionnaireId =data[0].questionnaire_id
      this.testPost = data[0].havetest
      this.lessonAllStatus = data[0].statusLearnAllpass
      console.log("------------------");
      
      console.log(data[0].statusCourseTest);
      console.log(data);
      
      this.statusCourseTest = data[0].statusCourseTest
      this.appDetail="detail"
      if (data[0].course_detail == "") {
        this.element = "ไม่มีข้อมูล"
       }else{
        var element1 = document.createElement('div');  
        this.detail =  this.custom.getDecodeHTMLEntities(data[0].course_detail)
        element1.innerHTML = this.detail 
        this.element = element1.textContent
       }
       let alert = this.alertCtrl.create({
        message: `<center>
        <img src="assets/icon/warning.svg" width="30%" height="30%" >
        <h2 style="color: red;">ท่านได้ลงทะเบียนเรียน</h2>
        <h2>หลักสูตร "${data[0].course_title}" เรียบร้อยแล้ว</h2>
        <p>ท่านมีระยะเวลาการเรียน จำนวน  ${data[0].course_day_learn} วัน</p>
  </center> `,
        buttons: ['ตกลง']
      });
      alert.present();
    })
   })
  }
  goToSlide() {
    this.slider.slideTo(1, 500);
  }
  slidePrev(){
    this.slider.slidePrev(500,true)
  }
  lessonID(id :any){
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      });
      loading.present();
    this.storage.get('id').then(val =>{
      this.lesson.dataForLesson(id,val[0]).subscribe(data => {      
        console.log(data);
          
        if (data.length == 0) {
          this.dataFor = [1]
        }else{
          this.dataFor = data
        }    
        loading.dismiss();
      })
    })
  }
  ionViewDidLoad(){
    this.viewController.setBackButtonText('ย้อนกลับ')
  }
  goToEval(){
    this.storage.get('id').then(val =>{
      this.courseIdCategory.courseOnline(val[0],this.navParams.get('id')).subscribe(data =>{
        console.log(data);
        if (data[0].statusLearnAllpass) {
          let id ={
            questionnaireId:data[0].questionnaire_id
          }
          this.navCtrl.push(EvaluatePage,id)
        } else {
          let alert = this.alertCtrl.create({
            title: 'แจ้งแตือน',
            message: 'กรุณาเรียนให้ผ่านครบทุกบทเรียนก่อน',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                }
              }
            ]
          });
          alert.present();
        }
      })
     })
  }
testPostCourse(id,status){
  console.log(status);
  
 if (status) {
  this.storage.get('id').then(val =>{
    this.testQuestion.pretestPostCourse(val[0],this.navParams.get('id')).subscribe(data =>{
      let pre ={
        idCourse:id
      }
      let pre2 ={
        type:'coruse',
        id:id,
        topic:"แบบทดสอบท้ายหลักสูตร"
      }
      if (data.currentquiz) {
        this.navCtrl.push(PosttestPage,pre)
      }else{
        this.navCtrl.push(PretestQPage,pre2)
      }
    })
  })
 } else {
  let alert = this.alertCtrl.create({
    title: 'แจ้งแตือน',
    message: 'กรุณาเรียนให้ผ่านครบทุกบทเรียนก่อนและทำแบบประเมิณ',
    buttons: [
      {
        text: 'OK',
        handler: () => {
        }
      }
    ]
  });
  alert.present();
 }    
}

printCertificate(id,score){    
  if (score.score_past == "y" && this.lessonAllStatus) {
    if (score.score_past == 'y' || this.lessonAllStatus) {
      let path = null
      this.storage.get('id').then(val =>{
      if (this.platform.is('ios')) {
        path = this.file.documentsDirectory
      } else {
        path = this.file.dataDirectory
      }
      const fileTransfer = this.transfer.create();
      fileTransfer.download(`http://203.154.117.72/lms_dnp/Course/PrintCertificateapi?user_id=${val[0]}&course_id=${id}`,path + 'Certificate.pdf').then((entry) => {
        let url = entry.toURL()
        this.documentViewer.viewDocument(url,'application/pdf',{})
        console.log('download complete: ' + entry.toURL());
      }, (error) => {
        console.log(error);
     });  
    })
    }else{
      let alert = this.alertCtrl.create({
        title: 'แจ้งแตือน',
        message: 'กรุณาทำข้อสอบหลักสูตรให้ผ่านก่อน',
        buttons: [
          {
            text: 'OK',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    }
  } else {
      let alert = this.alertCtrl.create({
    title: 'แจ้งแตือน',
    message: 'กรุณาทำข้อสอบหลักสูตร',
    buttons: [
      {
        text: 'OK',
        handler: () => {
        }
      }
    ]
  });
  alert.present();
  }

  }
  
}
