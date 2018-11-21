import { Component,Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides, NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the EvaluatecardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'evaluatecard',
  templateUrl: 'evaluatecard.html'
})

export class EvaluatecardComponent {

  radio1:any;
  radio2:any;
  radio3:any;
  radio4:any;
  radio5:any;
  radio6:any;
  radio7:any;
  radio8:any;
  radio9:any;


@ViewChild('slides') slides: Slides;
@Input('surveyComponnet') survey:any

  constructor(public navCtrl: NavController) {
    console.log(this.survey);
    
  }



  next() {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext(500, true);
    this.slides.lockSwipeToNext(true);
  }

  prev() {
    this.slides.lockSwipeToPrev(false);
    this.slides.slidePrev(500, true);
    this.slides.lockSwipeToPrev(true);
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
}

  goToHome(){
    if(this.radio1!= undefined && this.radio2!= undefined && this.radio3!= undefined && this.radio4!= undefined &&
       this.radio5!= undefined && this.radio6!= undefined && this.radio7!= undefined && this.radio8!= undefined &&
        this.radio9!= undefined){
          this.navCtrl.setRoot(HomePage);
    }
  }
}
