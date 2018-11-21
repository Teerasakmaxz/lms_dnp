import { Component, ViewChild, OnInit, Renderer,Input } from '@angular/core';
import { NavController, NavParams ,AlertController, List,Platform} from 'ionic-angular';
import { LearnPage } from "../../pages/learn/learn";
import { PosttestPage } from "../../pages/posttest/posttest";
import { PretestPage } from "../../pages/pretest/pretest";
import { TestQuestion } from "../../services/testQuestion";
import { PretestQPage } from "../../pages/pretest-q/pretest-q";
import { Storage } from "@ionic/storage";
import { EvaluatePage } from '../../pages/evaluate/evaluate';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from "@ionic-native/file";
import { DocumentViewer } from "@ionic-native/document-viewer";

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit {
  accordionExapanded = false;
  @Input('lesson') lesson
  @ViewChild("cc") cardContent: any;
  @ViewChild("list") list:List
  icon: string = "arrow-forward";
  number1:any
  number2:any 
  number3:any 
  number4:any  
  dataForPre:any
  dataLesson:any
  show:boolean
  status:boolean =false


  constructor(public renderer: Renderer,public navCtrl: NavController,
     public navParams: NavParams,private alertCtrl: AlertController
     ,private storage:Storage,
     private testQuestion:TestQuestion,
     private transfer: FileTransfer,
     public platform: Platform,
     private file: File,
     private documentViewer:DocumentViewer
     ) {
  
  }

  ngOnInit() {
console.log(this.lesson.lesson_status);

    if (this.lesson.pre.pre > 0) {
      this.number1 = 1
    }
    if (this.lesson.file.length > 0) {
      if (this.number1 > 0) {
        this.number2 = this.number1 + 1     
       }else{
        this.number2 = 1
      }
    }else{
      if (this.number1 > 0) {
        this.number2 = 1
      }else{
        this.number2 = 0
      }
    }

    if (this.lesson.postscore == '' || this.lesson.postscore.score_past == 'n') {
      this.show = true
    } else {
      this.show = false
    }

    this.number3 =this.number2+1
    this.number4 = this.number3+1
    this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 700ms, padding 1000ms");
    this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
    this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");
  }

  toggleAccordion() {
    if (this.accordionExapanded) {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");

    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
    }

    this.accordionExapanded = !this.accordionExapanded;
    this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";
  }
  goToTest(event){
    this.storage.get('id').then(val =>{
      this.testQuestion.pretest(val[0],this.lesson.id).subscribe(data => { 
        console.log(this.lesson);
        
    let daataForLesson={
      idLesson: this.lesson.id
    }
    let daataForLesson2={
      type:'lesson',
      id: this.lesson.id,
      topic:"แบบทดสอบก่อนเรียน"
    }
    let daataForLesson3={
      type:'lesson',
      id: this.lesson.id,
      topic:"แบบทดสอบท้ายบทเรียน"
    }
    if (event == 'pre') {
      //ถ้ามีเรียง
      //****************************** */
      if (this.lesson.prescore == "" && this.lesson.postscore == ""){
        if (data.currentquiz) {
          this.navCtrl.push(PretestPage,daataForLesson)
        }else{
          this.navCtrl.push(PretestQPage,daataForLesson2)
        }
      }
    } else if(event == 'learn'){
      if(this.lesson.prescore != ""){
        //กรณีมีข้อสอบก่อนเรียน
        this.goToLearn();
      }else if(this.lesson.pre.pre == 0 ){
        //กรณีไม่มีข้อสอบก่อนเรียน
        this.goToLearn();
      }else{
        let alert = this.alertCtrl.create({
          title: 'แจ้งแตือน',
          message: 'ตรวจสอบแบบทดสอบก่อนเรียน',
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
    }else if(event == 'post'){
      if(this.lesson.prescore != "" && this.lesson.lesson_status == 'pass'){
        if (data.currentquiz) {
          this.navCtrl.push(PretestPage,daataForLesson)
        }else{
          this.navCtrl.push(PretestQPage,daataForLesson3)
          }
      }else{
        if (this.lesson.prescore == "" || this.lesson.lesson_status == 'null') {
          let alert = this.alertCtrl.create({
            title: 'แจ้งแตือน',
            message: 'กรุณาทำแบบทดสอบก่อนเรียนและเรียนให้ผ่านก่อน',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                }
              }
            ]
          });
          alert.present();
        } else {
          let alert = this.alertCtrl.create({
            title: 'แจ้งแตือน',
            message: 'กรุณาเรียนให้ผ่านก่อน',
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
    })
  })
}
goToLearn(){
  
    let data = {
      id: this.lesson.id
    }    
    this.navCtrl.push(LearnPage,data)
  }



  downDoad(item,index){        
    let path = null
    let URLpath =this.lesson.file[index].filepath
      this.status =true
      this.storage.get('id').then(val =>{
        if (this.platform.is('ios')) {
          path = this.file.documentsDirectory
        } else {
          path = this.file.dataDirectory
        }
        const fileTransfer = this.transfer.create();
        fileTransfer.download(URLpath,path + this.lesson.file[index].file_name).then((entry) => {
          let url = entry.toURL()
          let data =this.lesson.file[index].file_name.split(".")
          if(data[1] == "doc"){
            this.documentViewer.viewDocument(url,'application/doc',{})
  
          }else if(data[1] == "docx"){
            this.documentViewer.viewDocument(url,'application/docx',{})
  
          }else if(data[1] == "ppt"){
            this.documentViewer.viewDocument(url,'application/ppt',{})
  
          }else if (data[1] == "pptx") {
            this.documentViewer.viewDocument(url,'application/pptx',{})
          }else{
            this.documentViewer.viewDocument(url,'application/pdf',{})
          }
  
          console.log('download complete: ' + entry.toURL());
        }, (error) => {
          console.log(error);
          
          // handle error
        });
      })
  }
  test(){
    this.testQuestion.pretestPostCourse(1,40).subscribe(data =>{
      console.log(data);
      
    })
  }

}
