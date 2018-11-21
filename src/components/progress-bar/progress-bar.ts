import { Component, Input,Renderer,ViewChild, OnInit } from '@angular/core';


@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent implements OnInit {


  @Input ('progress') progress :any;
  @ViewChild("pie") pie :any
   num :any
   full:any =10
  @ViewChild("leftside") leftside :any
  @ViewChild("rightside") rightside :any
  @ViewChild("shadow") shadow:any


  constructor(public renderer : Renderer) {
   
  }

  ngOnInit() {
    // console.log(this.progress);
    
    this.updateDonutChart(this.progress, true);
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
    this.num = percent
    this.renderer.setElementStyle(this.leftside.nativeElement,'transform', 'rotate(' + deg + 'deg)');

}

// Pass in a number for the percent



}
