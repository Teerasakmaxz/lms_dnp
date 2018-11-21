import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import {  UsabilityForUserService } from "../../services/usabilityForUser";
import { CustomCode } from "../../services/customCode";
/**
 * Generated class for the InstructiondetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-instructiondetail',
  templateUrl: 'instructiondetail.html',
})
export class InstructiondetailPage implements OnInit {

   public data:any
   public detail:any
   public dataFor:any = []

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private usability:UsabilityForUserService,
    private customCode:CustomCode,    
    private loadingCtrl: LoadingController,
    ) {

  }

  ngOnInit() {
    this.instructionData(this.navParams.get('id'))

  }

  instructionData(id){
    let loading = this.loadingCtrl.create({
			spinner: 'ios',
		  });
			loading.present();
      this.usability.dataForInstructionId(id).subscribe(data=>{
        this.data = data
        this.detail = data[0]
        loading.dismiss()
      })
  }
}

