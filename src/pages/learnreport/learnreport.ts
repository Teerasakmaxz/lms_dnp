import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CourseIdCategory} from '../../services/courseIdCategory'
import {CustomCode} from '../../services/customCode'
import {ConfigService} from '../../services/config'
import { LearnPage } from "../learn/learn";



@Component({
  selector: 'page-learnreport',
  templateUrl: 'learnreport.html',
})
export class LearnreportPage {
  
  data = [
    {
      title : "ยังไม่เรียน",
      image : "assets/icon/iconred.png"
      
    },
    {
      title : "กำลังเรียน",
      image : "assets/icon/iconorange.png"
    },
    {
      title : "เรียนแล้ว",
      image : "assets/icon/icongreen.png"
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigService) {
  }


   


}
