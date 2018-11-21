import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams ,Slides} from 'ionic-angular';

@Component({
  selector: 'registerdetails1',
  templateUrl: 'registerdetails1.html'
})
export class Registerdetails1Component {
  Username:String;
  Lastname:String;
  Teluser:number;

  text: string;

  constructor() {
    console.log('Hello Registerdetails1Component Component');
    this.text = 'Hello World';
  }
  checkValue(){
    if (this.Username != undefined && this.Lastname != undefined && this.Teluser != undefined)
     {
      if (this.Username== this.Username)
      {
        console.log(this.Username);
       }
        else
         {
          console.log("เกิน");
         }
          }
       
           }
             }

    
