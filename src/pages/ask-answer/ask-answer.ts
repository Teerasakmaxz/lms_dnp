import { Component, ViewChild,OnInit,Renderer} from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import { FaqService } from "../../services/faq";



/**
 * Generated class for the AskAnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ask-answer',
  templateUrl: 'ask-answer.html',
})
export class AskAnswerPage {
  askanswerpage = false;
  @ViewChild("cc") cardContent: any;
  icon: string = "arrow-down";
public dataFaq :any
public answer :any

  constructor(
    public renderer: Renderer,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private faq : FaqService,
    private loadingCtrl: LoadingController,

    
  ){
       this.dataForFaq()

  }

  dataForFaq(){
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      });
      loading.present();
   this.faq.dataForFaq().subscribe(data =>{
     this.dataFaq = data
     loading.dismiss()
   })
  }
}
