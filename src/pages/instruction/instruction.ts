import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import { ConfigService } from '../../services/config';
import { UsabilityForUserService } from "../../services/usabilityForUser";
import { InstructiondetailPage } from "../instructiondetail/instructiondetail";


/**
 * Generated class for the InstructionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-instruction',
  templateUrl: 'instruction.html',
})
export class InstructionPage {

  public dataUsability :any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,

    // private config :ConfigService,
    private usabilityForUser : UsabilityForUserService
  ) {
   this.getDataForUsability();
  }
    getDataForUsability(){
      let loading = this.loadingCtrl.create({
        spinner: 'ios',
        });
        loading.present();
      this.usabilityForUser.dataForUsability().subscribe(data =>{
        this.dataUsability = data
        loading.dismiss()
      })
    }
    openInstructiondetail(id:any){
      let dataID ={
        id:id.usa_id
      }
            this.navCtrl.push(InstructiondetailPage,dataID);
            
    }
  }
