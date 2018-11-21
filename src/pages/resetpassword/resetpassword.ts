import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { Repassword } from "../../services/repassword";
/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
  email :any


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,private repassword:Repassword,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }

  clickbacktoLogin(){    
  if(this.email != "" && this.email != null && this.email != undefined){
    this.repassword.repassword(this.email).subscribe(data =>{      
      if (data.status) {
        let alert = this
        .alertCtrl
        .create({
          title: 'แจ้งเตือน', subTitle: data.msg, 
          buttons: [      {
            text: 'ตกลง',
            handler: () => {
              this.navCtrl.push(LoginPage)
            }
          }],
        });
      alert.present();
      }else{
        let alert = this
          .alertCtrl
          .create({
            title: 'แจ้งเตือน', subTitle: data.msg, buttons: ['ตกลง'],
          });
        alert.present();
      }
    })
    }else{
      let alert = this
      .alertCtrl
      .create({
        title: 'แจ้งเตือน', subTitle: 'กรุณากรอก E-mail', buttons: ['ตกลง'],
      });
    alert.present();
    }
  }
  back(){
  this.navCtrl.push(LoginPage)
  }
}
