import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides,LoadingController,AlertController } from 'ionic-angular';
import {ConfigService} from '../../services/config'
import { Problem } from "../../services/problem";
import { Storage } from "@ionic/storage";
import { Time } from "../../services/time";
import {CourseService} from '../../services/course';

@Component({
  selector: 'page-problemreport',
  templateUrl: 'problemreport.html',
})
export class ProblemreportPage {
  @ViewChild('mySlider') slider: Slides;
  public today = new Date().toISOString();  
  fistname:any
  lastname:any
  email:any
  tel:any
  topic:any
  message:any
  type:any
  items:any
  course:any
  app ='postProblemre';
  history : any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public config:ConfigService,private problem:Problem,private storage:Storage,
  public time :Time,private loadingCtrl: LoadingController,private alertCtrl : AlertController,
  public courseService : CourseService) {
  }

  ionViewDidLoad() {
 
    this.storage.get('id').then((val) => {
    this.problem.getContact(val[0]).subscribe(data =>{      
    this.history=data
    
    this.fistname = data[0].contac_by_name
    this.lastname= data[0].contac_by_surname
    this.email= data[0].contac_by_email
    this.tel= data[0].contac_by_tel
    })
    this.courseService
    .getAllCourseCategory()
    .subscribe(res => {
        this.items = res;
    });
  });
}
  goToSlide() {
    this.slider.slideTo(1, 500);
    this.storage.get('id').then((val) => {
      this.problem.getContact(val[0]).subscribe(data =>{  
        this.history=data
  
       }) 
    })
  }
  slidePrev(){
    this.slider.slidePrev(500,true)
  }
  sendProblemre(){
  let nowTime =this.time.format(this.today)
  this.storage.get('id').then((val) => {
    if (this.fistname == undefined || this.lastname == undefined,this.email == undefined || this.tel == undefined ||
    this.topic == undefined || this.message == undefined || this.type == undefined || this.course == undefined) {
      let alert = this.alertCtrl.create({title: 'แจ้งเตือน', subTitle: 'กรุณากรอกให้ครบทุกช่อง', buttons: [
        {
        text: 'OK',
        role: 'cancel',
        handler: () => {
        }
      }
    ]
  });
    alert.present();
    }else{
      this.problem.postDataProblem(this.fistname,this.lastname,this.email,
        this.tel,this.topic,this.message,this.type,null,null,'n',val[0],nowTime,val[0],nowTime,'y',this.course).subscribe(data =>{
          let loading = this.loadingCtrl.create({
            content: `
            <div class="loading-ios-padding-start">
              <div class="custom-spinner-box"></div>
            </div>`
            });
            loading.present();
          if (data == 0) {
            let alert = this.alertCtrl.create({title: 'แจ้งเตือน', subTitle: 'เกิดข้อผิดพลาด', buttons: [
              {
              text: 'OK',
              role: 'cancel',
              handler: () => {
                loading.dismiss();
              }
            }
          ]
        });
          alert.present();
            }else{
              loading.dismiss();
              this.goToSlide()
            }
        })
    }

    });
  }

  doRefresh(refresher) {
    this.storage.get('id').then((val) => {
      this.problem.getContact(val[0]).subscribe(data =>{  
        this.history=data
  
       }) 
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
