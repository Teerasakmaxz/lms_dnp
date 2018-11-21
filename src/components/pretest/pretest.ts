import { Component ,Input} from '@angular/core';
import { Storage } from "@ionic/storage";
import { TestQuestion } from "../../services/testQuestion";
import { NavController, NavParams,LoadingController} from 'ionic-angular';
import { PretestPage } from "../../pages/pretest/pretest";

/**
 * Generated class for the PretestComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pretest',
  templateUrl: 'pretest.html'
})
export class PretestComponent {
@Input('lessonData') lessonData:any
  dataForPre:any
  dataLesson:any
  

  constructor(private storage:Storage,private testQuestion:TestQuestion,
     public navCtr:NavController,public navParams:NavParams,public loadingCtrl: LoadingController) {

    this.storage.get('id').then(val =>{
      this.testQuestion.pretest(val[0],this.navParams.get('idLesson')).subscribe(data =>{        
       this.dataForPre = data     
       this.dataLesson = data.lesson
      //  console.log(data);
                            
       })
     })
  }
  actionTest(){
  
  this.storage.get('id').then(val =>{
    this.testQuestion.test(val[0],this.navParams.get('idLesson')).subscribe(data =>{
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: 'Loading Please Wait...'
      });
    
      loading.present();
    
      setTimeout(() => {
        this.navCtr.push(PretestPage)
        loading.dismiss()
      }, 5000);

     })
   })
  }
}
