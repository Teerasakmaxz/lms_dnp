import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsreportPage } from "../newsreport/newsreport";
import { ConfigService } from "../../services/config";
import { News } from "../../services/news";
import { CustomCode } from "../../services/customCode";
/**
 * Generated class for the NewdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-newdetail',
  templateUrl: 'newdetail.html',
})
export class NewdetailPage {
  cms_title:any
  cms_picture:any
  cms_detail:any


  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigService,private news:News,public customCode:CustomCode) {
      this.newsdata(this.navParams.get('id'))
  }
  newsdata(id){
    
    this.news.dataForNewId(id).subscribe(data =>{
      this.cms_title = this.customCode.getDecodeHTMLEntities(data[0].cms_title)
      this.cms_picture = data[0].cms_picture
      if (data[0].cms_detail == null) {
        this.cms_detail = ""
      } else {
        this.cms_detail =this.customCode.getDecodeHTMLEntities(data[0].cms_detail) 
      }
     
      
    })
  }
}
