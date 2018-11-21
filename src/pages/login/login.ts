import { RegisterPage } from "../register/register";
import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController,LoadingController,MenuController,Events} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {Storage} from '@ionic/storage';
import {ConfigService} from "../../services/config";
import { Login } from "../../services/login";
import { User } from "../../services/user";
import { ResetpasswordPage } from "../resetpassword/resetpassword";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-login'
, templateUrl: 'login.html'})
export class LoginPage implements OnInit {
  constructor(public navCtrl : NavController, 
    public navParams : NavParams, 
    private storage : Storage, 
    private alertCtrl : AlertController,
    public config: ConfigService,
    private login : Login,
    private loadingCtrl: LoadingController,
    public memu :MenuController,
    public events: Events,
    private dataUser:User
) {

  this.memu.enable(false,'mainmenu')
}

  password : any
  email : any
  isLoggedIn: boolean = false;
  user:any


  ngOnInit() {
  
  }

  clickLogin() {
    if (this.email == "" || this.password == "" || this.email == undefined || this.password == undefined || this.email == null || this.password == null) {
      let alert = this
        .alertCtrl
        .create({title: 'แจ้งเตือน', subTitle: 'กรุณากรอกให้ครบ', buttons: ['ตกลง']});
      alert.present();
    } else {

      this.login.loginService(this.email,this.password).subscribe(data =>{
        
        if (data == null || data == "") {
          let loading = this.loadingCtrl.create({
            content: `
            <div class="loading-ios-padding-start">
              <div class="custom-spinner-box"></div>
            </div>`
            });
            loading.present();
      let alert = this
        .alertCtrl
        .create({title: 'แจ้งเตือน', subTitle: 'Login ไม่ผ่าน', buttons: ['ตกลง']});
      alert.present();
      loading.dismiss()
        } else {
          this.user ={
            email:this.email,
            password:this.password
          }
                this.dataUser.dataForUser(data).subscribe(dataForUser =>{                  
                  this.events.publish("dataUser",dataForUser)
           
         
          this.storage.set('id', [data,this.user,dataForUser]);
        })
          this.navCtrl.setRoot(TabsPage)
        }
      })
    }
  }
  clickForgotpassword(){
    this.navCtrl.push(ResetpasswordPage)
  }
  clickToRegister(){
    this.navCtrl.push(RegisterPage)
  }

}
