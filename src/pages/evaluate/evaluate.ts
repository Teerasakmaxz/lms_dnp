import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Slides ,LoadingController} from 'ionic-angular';
import { Survey } from "../../services/survey";
import { Storage } from "@ionic/storage";


/**
 * Generated class for the EvaluatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-evaluate',
  templateUrl: 'evaluate.html',
})
export class EvaluatePage {
  @ViewChild('slides') slides: Slides;

  questionnaireId:any
  survey:any
  contentment:any = new Array
  text:any =[]
  taxtAr:any
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private questionnaireService :Survey,private storage:Storage,public loadingCtrl : LoadingController,) {
      this.questionnaireId = this.navParams.get('questionnaireId');

  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      });
      loading.present();
    this.storage.get('id').then(val =>{
      this.questionnaireService.questionnaire(val[0],this.questionnaireId).subscribe(data =>{
        console.log(data);
        
        this.survey = data.survey.item[0].item
        loading.dismiss()
      })
    })
  }

  sendSurvey(){
    let data = {"contentment":this.contentment,"text":this.text}
    
    console.log(data);
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      });
      loading.present();
    this.storage.get('id').then(val =>{
      this.questionnaireService.send(val[0],this.questionnaireId,data).subscribe(val =>{
        if (val.status) {
          this.navCtrl.pop()
          loading.dismiss()

        } else {
          //แจ้งเตือน
        }
      })
    })


  }
  mcqAnswer(type,id,val){    
    if(type == 'contentment'){      
        this.contentment[id] = val
        console.log(this.contentment);
        
    }
    if(type == 'text'){
      val =  this.taxtAr
      this.text[id] = val
    }
 
  }
  prev(){
    this.slides.slidePrev()
  }
  next(){
    this.slides.slideNext()
  }

}
