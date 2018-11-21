import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
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
  id:any
  videos:any
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private config : ConfigService,private storage:Storage,
    private learnServeice:LearnServeice,
    private loadingCtrl: LoadingController,) {
      let loading = this.loadingCtrl.create({
        spinner: 'ios',
        });
        loading.present();
    this.id = this.navParams.get('id')
    this.storage.get('id').then(val =>{      
    this.learnServeice.dataForLearn(this.id,val[0]).subscribe(data =>{      
        this.videos = data
        loading.dismiss()
        
        })
    })
   
  }
  ngOnInit() {
    
    }
 
}
