import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { ResetpasswordPage } from "../resetpassword/resetpassword";




@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  Email:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }
  clickbacktoLogin(){
    this.navCtrl.push(LoginPage)
  }
  clickToResetpassword(){
    this.navCtrl.push(ResetpasswordPage)
  }
}
