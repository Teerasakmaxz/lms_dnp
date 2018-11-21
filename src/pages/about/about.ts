import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import { ConfigService } from '../../services/config';
import { AboutService } from '../../services/about';
import { CustomCode } from '../../services/customCode'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  public about_detail:any;
  public test:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private config : ConfigService,
  private aboutService : AboutService,
  private loadingCtrl: LoadingController,


private customCode : CustomCode) {

this.getDataAbout();
}
getDataAbout(){
  let loading = this.loadingCtrl.create({
    spinner: 'ios',
    });
    loading.present();
    this.aboutService.dataForAbout().subscribe(data => {
    this.about_detail = this.customCode.getDecodeHTMLEntities(data[0].about_detail);
    loading.dismiss()

  })
 }
}
