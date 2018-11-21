import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { Video } from "../../services/video";

/**
 * Generated class for the VideointroducePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-videointroduce',
  templateUrl: 'videointroduce.html',
})
export class VideointroducePage {
  dataVideo :any

  constructor(public navCtrl: NavController, public navParams: NavParams,private video:Video) {
  }

  ionViewDidLoad() {

    this.video.video().subscribe(dataForVideo =>{
    this.dataVideo = dataForVideo
    })

  }

}
