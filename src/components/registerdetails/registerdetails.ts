import { Injectable,Component, ViewChild } from '@angular/core';
import { NavController, NavParams ,Slides} from 'ionic-angular';
import { RegisterdetailsPage } from "../../pages/registerdetails/registerdetails";
// import { FormBuilder, FormGroup } from '@angular/forms';
@Injectable()
@Component({
  selector: 'registerdetails',
  templateUrl: 'registerdetails.html'
})
export class RegisterdetailsComponent {
 IDcard:any;
 UserEmail:any;
 Password:any;
 RePassword:any;

 text: string;

  constructor(public navCtrl: NavController) {
    console.log('Hello RegisterdetailsComponent Component');
    this.text = 'Hello World';
    
 
  }
 checkValue(){
   if(this.IDcard != undefined && this.UserEmail != undefined && this.Password != undefined && this.RePassword != undefined)
   {
     if (this.IDcard.length == 13) 
      {
        console.log(this.IDcard)
       }
        else
         {
          console.log("เกิน");
         }
          }
       
              
          else{
           
            console.log(this.IDcard)
         }
   if (this.UserEmail == this.UserEmail) {
    console.log(this.UserEmail)
         } else {
           console.log(this.UserEmail)
         }
         if (this.Password == this.Password) {
          console.log(this.Password)
               } else {
                console.log(this.Password)
               }
               if (this.RePassword == this.RePassword) {
                console.log(this.RePassword)
                     } else {
                      console.log(this.RePassword)
                     }
           }
             }
