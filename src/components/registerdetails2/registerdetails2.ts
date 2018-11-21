import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams ,Slides} from 'ionic-angular';

@Component({
  selector: 'registerdetails2',
  templateUrl: 'registerdetails2.html'
})
export class Registerdetails2Component {
  
  text: string;

  constructor() {
    console.log('Hello Registerdetails2Component Component');
    this.text = 'Hello World';
  }

}
