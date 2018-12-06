import { Component ,Input,ViewChild} from '@angular/core';
import { Slides } from "ionic-angular";
import { LearnServeice } from "../../services/learn";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'videocomponent',
  templateUrl: 'videocomponent.html'
})
export class VideocomponentComponent {
  @ViewChild('mySlider') slider: Slides;
  @ViewChild('mySliderOne') sliderOne: Slides;

  text: string;
  @Input('video') video:any;
  sliderg:any
  index:any
  time:any
  constructor(private learnServeice:LearnServeice,private storage:Storage) {
  
  }
  ngOnInit(){    
    if (this.video != 0) {
      console.log("---------------------");
      let vdo = this;
      this.sliderg = this.video.image
       let myPlayer = <HTMLVideoElement>document.getElementById('my-video');     
       if( this.video.last == [] || this.video.last == "" || this.video.last == 'l'){  
        vdo.index = 0;      
        myPlayer.currentTime = 0;
       }else if(this.video.last != 's'){
        this.index = vdo.video.last-1;
        myPlayer.currentTime = vdo.video.image[1].image_slide_time
         var myCurrentTime = myPlayer.currentTime
        myPlayer.onseeking =()=>{
          if (myCurrentTime < myPlayer.currentTime) {
            myPlayer.currentTime = myCurrentTime;
          }
        }   
       }
       vdo.time =  setInterval(function() {
        var timePlayed = myCurrentTime;
        var percenttimePlayed = (myPlayer.duration / 60);
        percenttimePlayed = (100 / percenttimePlayed);
        percenttimePlayed = (timePlayed/60) * percenttimePlayed;
        if(myPlayer.currentTime > timePlayed){
          if (!myPlayer.paused){
            myCurrentTime = myPlayer.currentTime;
          }
        }
       let update = timePlayed%30 | 0
      if (vdo.video.last != 's') {
       if (update == 0 ) {      
        vdo.storage.get('id').then((val)=>{
          if (vdo.video.image == [] || vdo.video.image == "") {
            myPlayer.onended = ()=>{
              vdo.learnServeice.postTimeService(val[0],vdo.video.learn[0].lesson_id,vdo.video.learn[0].id,'s').subscribe(data =>{
              })
            }
            vdo.learnServeice.postTimeService(val[0],vdo.video.learn[0].lesson_id,vdo.video.learn[0].id,timePlayed).subscribe(data =>{
            })
          }else{
            myPlayer.onended = ()=>{
              console.log("-----------!!!!!!!!!!!!!----------------");
              
              vdo.learnServeice.postTimeService(val[0],vdo.video.learn[0].lesson_id,vdo.video.learn[0].id,'s').subscribe(data =>{
              })
            }
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            vdo.learnServeice.postTimeService(val[0],vdo.video.learn[0].lesson_id,vdo.video.learn[0].id,vdo.index).subscribe(data =>{
            })
          }
        })
       } 
      }else{
        clearInterval(vdo.time)
      }
        if(vdo.index < (vdo.video.image.length)){
          console.log("if1")
          vdo.slider.lockSwipeToNext(true)
          if(myPlayer.currentTime > vdo.video.image[1].image_slide_time ){ 
            vdo.slider.lockSwipeToNext(false)    
            console.log("if2")       
             vdo.slider.slideTo(vdo.index,500)
            vdo.sliderOne.slideTo(vdo.index,500)
              vdo.index++
              console.log(vdo.index+" LLLL");
          }
        }else if(vdo.index == vdo.video.image.length){
          clearInterval(vdo.time)
          }        
      }, 1000);
    } else {
  console.log("-----------!!!!!!!!!!----------");
      clearInterval(this.time)
    }    
  }
  setTimeVideo(timePlay:any){
    let myPlayer = <HTMLVideoElement>document.getElementById('my-video');
    myPlayer.currentTime = timePlay.image_slide_time
    this.index = this.sliderOne.getActiveIndex()
   }
   test(){     
    clearInterval(this.time)
   }
}

