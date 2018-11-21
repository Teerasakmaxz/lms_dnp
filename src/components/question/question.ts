import { Component, Input, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { PretestPage } from '../../pages/pretest/pretest';

/**
 * Generated class for the QuestionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'question',
  templateUrl: 'question.html'
})
export class QuestionComponent {
  [x: string]: any;
 items :  Array<{}>;

 
  
  @ViewChild('mySlider') slider: Slides;
  @Input('num')  text: any;
  
  
  

  constructor() {
    this.items = [
      {num :'1',code:1},
      {num :'2',code:2},
      {num :'3',code:3},
      {num :'4',code:4},
      {num :'5',code:5},
      {num :'6',code:6},
      {num :'7',code:7},
      {num :'8',code:8},
      {num :'9',code:9},
      {num :'10',code:10},
      {num :'11',code:11},
      {num :'12',code:12},
      {num :'13',code:13},
      {num :'14',code:14},
      {num :'15',code:15},
        ]
    console.log('Hello QuestionComponent Component');
   
  }

  goToNext(){

    this.slider.slideNext();
  }

  prev(){

    this.slider.slidePrev();
  }

  ShowQuestion(detail,items){
    console.log("ShowQuestion" + detail);


   this.slider.slideTo(items,500);
    


    
  }



  


  



}
