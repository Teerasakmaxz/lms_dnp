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
  constructor(private learnServeice:LearnServeice,private storage:Storage) {
  
  }
  ngOnInit(){
    let vdo = this;
    this.sliderg = this.video.image
     let myPlayer = <HTMLVideoElement>document.getElementById('my-video');
     if( this.video.last == [] || this.video.last == "" || this.video.last == 'l'){  
      vdo.index = 0;
      myPlayer.currentTime = 0;
     }else if(this.video.last != 's'){
       console.log(vdo.video.last);
      this.index = vdo.video.last-1;
        myPlayer.currentTime = vdo.video.image[this.video.last - 1].image_slide_time

       var myCurrentTime = myPlayer.currentTime
      myPlayer.onseeking =()=>{
        if (myCurrentTime < myPlayer.currentTime) {
          myPlayer.currentTime = myCurrentTime;
        }
      }   
     }
   let time =  setInterval(function() {
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
            vdo.learnServeice.postTimeService(val[0],vdo.video.learn[0].lesson_id,vdo.video.learn[0].id,'s').subscribe(data =>{
            })
          }
          vdo.learnServeice.postTimeService(val[0],vdo.video.learn[0].lesson_id,vdo.video.learn[0].id,vdo.index).subscribe(data =>{
          })
        }
      })
     } 
    }else{
      clearInterval(time)
    }
    
      if(vdo.index < (vdo.video.image.length)){
        console.log("if1")
        vdo.slider.lockSwipeToNext(true)
        if(myPlayer.currentTime > vdo.video.image[vdo.index].image_slide_time ){ 
          vdo.slider.lockSwipeToNext(false)    
          console.log("if2")       
           vdo.slider.slideTo(vdo.index,500)
          vdo.sliderOne.slideTo(vdo.index,500)
            vdo.index++
            console.log(vdo.index+" LLLL");
            
        }
      }else if(vdo.index == vdo.video.image.length){
        clearInterval(time)
        }        
    }, 1000);
  }
  setTimeVideo(time:any){
    let myPlayer = <HTMLVideoElement>document.getElementById('my-video');
    myPlayer.currentTime = time.image_slide_time
    this.index = this.sliderOne.getActiveIndex()
   }
  postTime(){

  }

}

