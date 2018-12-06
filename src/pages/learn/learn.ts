import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import { Slides } from "ionic-angular";

import { ConfigService } from '../../services/config';
import { LearnServeice } from "../../services/learn";
import { Storage } from "@ionic/storage";
/**
 * Generated class for the LearnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-learn',
  templateUrl: 'learn.html',
  
})
export class LearnPage { 

  @ViewChild('mySlider') slider: Slides;
  @ViewChild('mySliderOne') sliderOne: Slides;
  id:any
  videos:any
  text: string;
  sliderg:any
  index:any
  time:any
  constructor(private learnServeice:LearnServeice,private storage:Storage,
    public navCtrl: NavController, public navParams: NavParams,
    private config : ConfigService,private loadingCtrl: LoadingController) {
  }
  ngOnInit(){
    let vdo = this;
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      });
      loading.present();
  this.id = this.navParams.get('id')
  this.storage.get('id').then(val =>{      
  this.learnServeice.dataForLearn(this.id,val[0]).subscribe(data =>{    
    this.sliderg = data[0].image      
      this.videos = data      
      loading.dismiss()
      })
  })
}
  ionViewWillLeave() {
  }
}
