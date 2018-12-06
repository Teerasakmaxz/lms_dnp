import { Component ,Input,ViewChild} from '@angular/core';
import { Slides } from "ionic-angular";
import { LearnServeice } from "../../services/learn";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'pdfcomponent',
  templateUrl: 'pdfcomponent.html'
})
export class PdfcomponentComponent {
  @ViewChild('mySlider') slider: Slides;

  @Input('pdfdoc') pdf:any;
  sliderg:any
  item:any


  constructor(private learnServeice:LearnServeice,private storage:Storage) {

  }
  ngOnInit(){
    console.log(this.pdf.image.length - 1);
    
    this.sliderg = this.pdf.image
    this.item = this.pdf.last
  }
  ionViewDidLoad() {
    this.slider.slideTo(this.pdf.last,1)
  }
  next(){
    if (this.pdf.last != this.pdf.image.length - 1) {
  this.slider.slideNext(500)
  this.storage.get('id').then(val =>{
    if (this.pdf.last != 's') {
      this.learnServeice.postTimeService(val[0],this.pdf.lesson_id,this.pdf.image[0].file_id,this.slider.getActiveIndex()).subscribe(data=>{
        console.log(data);
      })
    }
  })
} else {
      console.log("11111111111");
      
}
  }
  
  prev(){
    this.slider.slidePrev(500)
  }
}
