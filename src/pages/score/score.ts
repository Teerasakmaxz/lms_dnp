import { Component ,ViewChild ,Renderer} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ScorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-score',
  templateUrl: 'score.html',
})
export class ScorePage {
  @ViewChild("pie") pie :any
  @ViewChild("leftside") leftside :any
  @ViewChild("rightside") rightside :any
  @ViewChild("shadow") shadow:any
  data:any
  score_past:any
  score_number:any
  full_score:any
  num:any =0
  per:any =0

  constructor(public navCtrl: NavController, public navParams: NavParams,public renderer : Renderer) {
    this.data = this.navParams.get('value');
  }

  ionViewDidLoad() {
    this.full_score = this.data.modelScore.score_total
    this.score_past = this.data.modelScore.score_past
    this.score_number = this.data.modelScore.score_number
    this.num = this.score_number
    this.per = (this.score_number/this.full_score)*100
    this.per = parseInt(this.per) 
    this.updateDonutChart(this.per,true)
  }

  updateDonutChart(percent, donut) {
    percent = Math.round(percent);
    if (percent > 100) {
        percent = 100;
    } else if (percent < 0) {
        percent = 0;
    }
    var deg = Math.round(360 * (percent / 100));


    if(percent > 50){
      this.renderer.setElementStyle(this.pie.nativeElement,'clip', 'rect(auto, auto, auto, auto)');
      this.renderer.setElementStyle(this.rightside.nativeElement,'transform', 'rotate(180deg)');
    }else{
      this.renderer.setElementStyle(this.pie.nativeElement,'clip', 'rect(0, 1em, 1em, 0.5em)');
      this.renderer.setElementStyle(this.rightside.nativeElement,'transform', 'rotate(0deg)');
    }
    if (donut) {
      this.renderer.setElementStyle(this.rightside.nativeElement,'border-width', '0.1em');
      this.renderer.setElementStyle(this.leftside.nativeElement,'border-width', '0.1em');
      this.renderer.setElementStyle(this.shadow.nativeElement,'border-width', '0.1em');
    }else{
      this.renderer.setElementStyle(this.rightside.nativeElement,'border-width', '0.5em');
      this.renderer.setElementStyle(this.leftside.nativeElement,'border-width', '0.5em');
      this.renderer.setElementStyle(this.shadow.nativeElement,'border-width', '0.5em');
    }
    this.renderer.setElementStyle(this.leftside.nativeElement,'transform', 'rotate(' + deg + 'deg)');

}
goback(){
  this.navCtrl.popToRoot();
}

}
