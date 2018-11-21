import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { RegisterdetailsPage } from "../registerdetails/registerdetails";
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  [x: string]: any;
  confirm: boolean;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    console.log(this.confirm);
  }
  clickbacktoLogin(){
    this.navCtrl.push(LoginPage)
  }
  clickToRegisterdetails(){
    if (this.confirm==true) {
       this.navCtrl.push(RegisterdetailsPage)
       ///////
    } else {
      let alert = this
      .alertCtrl
      .create({title: 'แจ้งเตือน', subTitle: 'กรุณากดยืนยันข้อกำหนดการสมัคร', buttons: ['ตกลง']});
    alert.present();
    }

  }
  clickbackToLoginPags(){
    this.navCtrl.push(LoginPage)
  }
  
}
