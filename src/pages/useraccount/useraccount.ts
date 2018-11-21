import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
import {ConfigService} from '../../services/config'
import { User } from "../../services/user";
import { Storage } from "@ionic/storage";
/**
 * Generated class for the UseraccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-useraccount',
  templateUrl: 'useraccount.html',
})
export class UseraccountPage {
  profile:any

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public config:ConfigService,
    public event:Events,
  public user:User,
private storage:Storage) {
    this.storage.get('id').then((data)=>{
      this.profile = data[2][0]
      console.log(data);
      
    })
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UseraccountPage');
  }

}
