import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ConfigService} from '../../services/config'
import { NewdetailPage } from "../newdetail/newdetail"
import { News } from "../../services/news";
/**
 * Generated class for the NewsreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-newsreport',
  templateUrl: 'newsreport.html',
})
export class NewsreportPage {
  dataNew:any
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigService,private news:News) {
    
  }

  ngOnInit(){
    this.newsdata()
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsreportPage');
  }
 
  newsdata(){
    this.news.dataForNew().subscribe(data=>{
      console.log(data);
      this.dataNew = data
    })
  }
  goTonewdetailpage(id){
    let data = {
			id: id.cms_id
		}
    this.navCtrl.push(NewdetailPage,data)
  }
  

  
}
