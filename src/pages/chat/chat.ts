import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigService } from '../../services/config';



@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  username: string = '';
  message: string = '';
  messages: object[] = [];

  
  constructor(public navCtrl: NavController, public navParams: NavParams,private config : ConfigService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }
  sendMessage() {
    let data ={
      username: "maxz",
      message:this.message

    }
    this.messages.push(data)    
    this.message = '';
  }
  ionViewWillLeave(){
  
  }

}
