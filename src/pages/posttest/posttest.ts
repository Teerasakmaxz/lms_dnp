import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides,ViewController,AlertController} from 'ionic-angular';
import {ConfigService} from '../../services/config'
import { LearndetailPage } from '../learndetail/learndetail';
import { Storage } from "@ionic/storage";
import { TestQuestion } from "../../services/testQuestion";
import { CustomCode } from "../../services/customCode";
import { UpdateTime } from "../../services/updateTime";
import { ScorePage } from "../score/score";


/**
 * Generated class for the PosttestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-posttest',
  templateUrl: 'posttest.html',
})
export class PosttestPage {
  @ViewChild('mySlider') slider: Slides;
  currentQuizTime:any
  ansTextarea:any
  ansDropdown:any
  ansRadio:any
  ansCheckBox:any =[]
  indexSliders:any = 0
  userID:any
  lastQustion:any
  cucumber:any
//radio  
  dataLesson :any
  dataForPre:any
  expression:boolean = false
  question:any
  choice:any
  choiceType:any
  temp:any
  status:any
  currentQuiz:any
  choiceRadio:any =[]
  //dropdown
  questionDropdown:any
  choiceDropdown:any
  choiceDropdownIndex:any =[]

  dataForScore:any ={};



  //time
   hours :any = 0;
  minutes:any = 0;
 seconds:any = 0;
  timeStr:any = "00:00:00";
  interval :any


  choice1:any
  



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public config:ConfigService,private storage:Storage,
  private testQuestion:TestQuestion,private viewController :ViewController,private customCode:CustomCode,
  private updateTime:UpdateTime,private alertCtrl: AlertController) {

  }
  ngOnInit(){

    this.storage.get('id').then(val =>{
      this.testQuestion.testPostCourse(val[0],this.navParams.get('idCourse')).subscribe(data =>{
        console.log(data);
        if (data.status) {
          this.choiceDropdown = [];
          this.choiceDropdownIndex = [];
          this.choiceRadio =[]
       this.question = this.customCode.getDecodeHTMLEntities(data.question.ques_title) 
       if (data.choice.length != 0) {
         this.choice = data.choice
         this.lastQustion = data.last_ques
         this.choice.forEach((element,index) => {
           this.choiceRadio.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))

         });
          //dropdown
        this.questionDropdown = this.customCode.getDecodeHTMLEntities(data.choice[0].choice_detail)
       }else{
         console.log("++++++++++++++++++++++++++++++++");
       }          
       this.choiceType = data.question.ques_type
       this.temp = data.temp_all
       this.currentQuiz = data.currentQuiz
         this.currentQuizTime = data.currentQuiz.time_up
         this.time_test_start(this.currentQuizTime)
       let dataArray = data.currentQuiz.ans_id
       if (dataArray != null || dataArray!=undefined || dataArray != "") {
         if (dataArray != null) {
           dataArray.forEach(element => {
               this.ansRadio = element                
             });
         } 
       }
       this.ansRadio = undefined

         if (this.choiceType == 4) {
           for (let index = 1; index < data.choice.length; index++) {
             this.choiceDropdown.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
             const element = data.choice[index];        
             this.choiceDropdownIndex.push(element)
           }  
         } 
        } else {
          let alert = this.alertCtrl.create({
            title: 'แจ้งแตือน',
            message: data.msg,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.navCtrl.pop()
                }
              }
            ]
          });
          alert.present();
        }
 
       })
     })
  }
  add(item){
    const g = this.ansCheckBox.indexOf(item)
    console.log(g);
    if (g >= 0) {
      this.ansCheckBox.splice(g,1)
    }else{
      this.ansCheckBox.push(item)
    }
   
  }

  ionViewDidLoad() {
    this.viewController.showBackButton(false)
  }
  goback(){
    this.navCtrl.pop()
    
  }
  goToNext(){
    console.log(this.ansCheckBox);
    this.indexSliders++
    if (this.ansRadio != undefined || this.ansRadio != null || 
      this.ansDropdown != undefined ||this.ansDropdown != null || 
      this.ansTextarea != undefined || this.ansTextarea != null ||
      this.ansCheckBox != undefined || this.ansCheckBox != null) {

      this.storage.get('id').then(val =>{
        if (this.choiceType == 1) {
          if (this.ansCheckBox != null || this.ansCheckBox != undefined) {
            
            this.testQuestion.updateTempPostCourse(val[0],this.navParams.get('idCourse'),this.choice[0].ques_id,'next',this.currentQuiz.number,"",this.ansCheckBox,this.choiceType).subscribe(data =>{
              this.slider.slideTo(this.indexSliders,500);
              this.expression = true
              this.choiceDropdown = [];
              this.choiceDropdownIndex = [];
              this.choiceRadio =[]
              this.lastQustion = data.last_ques
           this.question = this.customCode.getDecodeHTMLEntities(data.question.ques_title) 
           console.log(data);
           
           if (data.choice.length != 0) {
             this.choice = data.choice
             this.choice.forEach((element,index) => {
               this.choiceRadio.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
             });
              //dropdown
            this.questionDropdown = this.customCode.getDecodeHTMLEntities(data.choice[0].choice_detail)
           }        
               this.choiceType = data.question.ques_type
              this.temp = data.temp_all              
              this.currentQuiz = data.currentQuiz
              this.ansRadio = undefined
              let dataArray = data.currentQuiz.ans_id
              if (dataArray != null) {
                dataArray.forEach(element => {
                    this.ansRadio = element                
                  });
              } 
              if (this.choiceType == 4) {
                for (let index = 1; index < data.choice.length; index++) {
                  this.choiceDropdown.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
                  const element = data.choice[index];        
                  this.choiceDropdownIndex.push(element)
                }  
              } 
            })
          }
        }
        if (this.choiceType == 2) {
          if (this.ansRadio != undefined || this.ansRadio != null) {
            this.testQuestion.updateTempPostCourse(val[0],this.navParams.get('idCourse'),this.choice[0].ques_id,'next',this.currentQuiz.number,"",this.ansRadio,this.choiceType).subscribe(data =>{
              this.slider.slideTo(this.indexSliders,500);
              this.expression = true
              this.choiceDropdown = [];
              this.choiceDropdownIndex = [];
              this.choiceRadio =[]
           this.question = this.customCode.getDecodeHTMLEntities(data.question.ques_title) 
           if (data.choice.length != 0) {
             this.choice = data.choice
             this.choice.forEach((element,index) => {
               this.choiceRadio.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
             });
              //dropdown
            this.questionDropdown = this.customCode.getDecodeHTMLEntities(data.choice[0].choice_detail)
           }        
           this.lastQustion = data.last_ques

               this.choiceType = data.question.ques_type
              this.temp = data.temp_all
              this.currentQuiz = data.currentQuiz
              this.ansRadio = undefined
              let dataArray = data.currentQuiz.ans_id
              if (dataArray != null) {
                dataArray.forEach(element => {
                    this.ansRadio = element                
                  });
              } 
              if (this.choiceType == 4) {
                for (let index = 1; index < data.choice.length; index++) {
                  this.choiceDropdown.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
                  const element = data.choice[index];        
                  this.choiceDropdownIndex.push(element)
                }  
              } 
            })
          }
        }
        if (this.choiceType == 3) {
          if (this.ansTextarea != undefined || this.ansTextarea != null) {            
          this.testQuestion.updateTempPostCourse(val[0],this.navParams.get('idCourse'),this.choice[0].ques_id,'next',this.currentQuiz.number,"",this.ansTextarea,this.choiceType).subscribe(data =>{
            this.slider.slideTo(this.indexSliders,500);
            this.expression = true
            this.choiceDropdown = [];
            this.choiceDropdownIndex = [];
            this.choiceRadio =[]
         this.question = this.customCode.getDecodeHTMLEntities(data.question.ques_title) 
         if (data.choice.length != 0) {
           this.choice = data.choice
           this.choice.forEach((element,index) => {
             this.choiceRadio.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
           });
            //dropdown
          this.questionDropdown = this.customCode.getDecodeHTMLEntities(data.choice[0].choice_detail)
         }        
         this.lastQustion = data.last_ques

             this.choiceType = data.question.ques_type
            this.temp = data.temp_all
            this.currentQuiz = data.currentQuiz
            this.ansRadio = undefined
            let dataArray = data.currentQuiz.ans_id
            if (dataArray != null) {
              dataArray.forEach(element => {
                  this.ansRadio = element                
                });
            } 
            if (this.choiceType == 4) {
              for (let index = 1; index < data.choice.length; index++) {
                this.choiceDropdown.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
                const element = data.choice[index];        
                this.choiceDropdownIndex.push(element)
              }  
            } 
          })
        }
        }
        if (this.choiceType == 4) {
         if (this.ansDropdown != undefined ||this.ansDropdown != null || this.ansDropdown != []) {
          this.testQuestion.updateTempPostCourse(val[0],this.navParams.get('idCourse'),this.choice[0].ques_id,'next',this.currentQuiz.number,"",this.ansDropdown,this.choiceType).subscribe(data =>{
            console.log(data);
            
            this.slider.slideTo(this.indexSliders,500);
            this.expression = true
            this.choiceDropdown = [];
            this.choiceDropdownIndex = [];
            this.choiceRadio =[]
         this.question = this.customCode.getDecodeHTMLEntities(data.question.ques_title) 
         if (data.choice.length != 0) {
        
           this.choice = data.choice
           this.choice.forEach((element,index) => {
             this.choiceRadio.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
    
           });
       
            //dropdown
           
          this.questionDropdown = this.customCode.getDecodeHTMLEntities(data.choice[0].choice_detail)
         }else{
           console.log("+++++++++++++++++++++");
           
         }        
         this.lastQustion = data.last_ques

             this.choiceType = data.question.ques_type
            this.temp = data.temp_all
            this.currentQuiz = data.currentQuiz
            this.ansRadio = undefined
            let dataArray = data.currentQuiz.ans_id
            if (dataArray != null) {
              dataArray.forEach(element => {
                  this.ansRadio = element                
                });
            } 
            if (this.choiceType == 4) {
              for (let index = 1; index < data.choice.length; index++) {
                this.choiceDropdown.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
                const element = data.choice[index];        
                this.choiceDropdownIndex.push(element)
              }                
            } 
          })
        }
      }
    })
    } else {
      this.storage.get('id').then(val =>{
      this.testQuestion.updateTempPostCourse(val[0],this.navParams.get('idCourse'),null,'next',this.currentQuiz.number,"","null","null").subscribe(data =>{

        
        this.slider.slideTo(this.indexSliders,500);
        this.expression = true
        this.choiceDropdown = [];
        this.choiceDropdownIndex = [];
        this.choiceRadio =[]
     this.question = this.customCode.getDecodeHTMLEntities(data.question.ques_title) 
     if (data.choice.length != 0) {
       this.choice = data.choice
       this.choice.forEach((element,index) => {
         this.choiceRadio.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
       });
        //dropdown
      this.questionDropdown = this.customCode.getDecodeHTMLEntities(data.choice[0].choice_detail)
     }           
     this.lastQustion = data.last_ques
        this.choiceType = data.question.ques_type
        this.temp = data.temp_all
        let dataArray = data.currentQuiz.ans_id
        this.currentQuiz = data.currentQuiz
        console.log(this.currentQuiz);
        
        this.ansRadio = undefined
        if (dataArray != null) {
          dataArray.forEach(element => {
              this.ansRadio = element                
            });
        } 
        if (this.choiceType == 4) {
          for (let index = 1; index < data.choice.length; index++) {
            this.choiceDropdown.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
            const element = data.choice[index];        
            this.choiceDropdownIndex.push(element)
            console.log( this.choiceDropdownIndex);

          }  
        } 
      })
    })
  } 
}
  prev(){    
    this.storage.get('id').then(val =>{
      this.testQuestion.updateTempPostCourse(val[0],this.navParams.get('idCourse'),"null",'previous',this.slider.getActiveIndex()+2,"","null","null").subscribe(data =>{
        console.log("prev "+data);
        this.choiceDropdown = [];
        this.choiceDropdownIndex = [];
        this.choiceRadio =[]
     this.question = this.customCode.getDecodeHTMLEntities(data.question.ques_title) 
     if (data.choice.length != 0) {
       this.choice = data.choice
       this.choice.forEach((element,index) => {
         this.choiceRadio.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
       });
        //dropdown
      this.questionDropdown = this.customCode.getDecodeHTMLEntities(data.choice[0].choice_detail)
     }  
        this.choiceType = data.question.ques_type
        this.temp = data.temp_all    
        let dataArray = data.currentQuiz.ans_id
        this.currentQuiz = data.currentQuiz
        this.ansRadio = undefined
        if (dataArray != null) {
          dataArray.forEach(element => {
              this.ansRadio = element                
            });
        }  
        if (this.choiceType == 4) {
          for (let index = 1; index < data.choice.length; index++) {
            this.choiceDropdown.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
            const element = data.choice[index];        
            this.choiceDropdownIndex.push(element)
            

          }  
        }  
      })
    })    
      if (this.indexSliders > 0 ) {
        this.indexSliders--

        this.slider.slideTo(this.indexSliders,500)

    }
  }
  sendAns(event){
    this.storage.get('id').then(val =>{
          this.userID =val[0]
          if (this.choiceType == 1) {
            if (this.ansCheckBox == null || this.ansCheckBox == undefined) {
              this.testQuestion.updateTempPostCourse(this.userID,this.navParams.get('idCourse'),this.choice[0].ques_id,event,this.currentQuiz.number,1,"null",this.choiceType).subscribe(data =>{                
                this.dataForScore ={value:data} 
                this.navCtrl.push(ScorePage,this.dataForScore)
                console.log(data);
               
              })
            }else{
              this.testQuestion.updateTempPostCourse(this.userID,this.navParams.get('idCourse'),this.choice[0].ques_id,event,this.currentQuiz.number,1,this.ansCheckBox,this.choiceType).subscribe(data =>{
                this.dataForScore ={value:data}   
                this.navCtrl.push(ScorePage,this.dataForScore)
                console.log(data);
             
              })
            }
          }
            if (this.choiceType == 2) {
              if (this.ansRadio == undefined || this.ansRadio == null) {
                this.testQuestion.updateTempPostCourse(this.userID,this.navParams.get('idCourse'),this.choice[0].ques_id,event,this.currentQuiz.number,1,"null",this.choiceType).subscribe(data =>{
                  this.dataForScore ={value:data} 
                  this.navCtrl.push(ScorePage,this.dataForScore)
                  console.log(data);
               
                })
              } else{
                this.testQuestion.updateTempPostCourse(this.userID,this.navParams.get('idCourse'),this.choice[0].ques_id,event,this.currentQuiz.number,1,this.ansRadio,this.choiceType).subscribe(data =>{
                this.dataForScore ={value:data}   
                this.navCtrl.push(ScorePage,this.dataForScore)
                console.log(data);
             
                })
              }
            }
            if (this.choiceType == 3) {
              if (this.ansTextarea == undefined || this.ansTextarea == null) {
                this.testQuestion.updateTempPostCourse(this.userID,this.navParams.get('idCourse'),this.currentQuiz.ques_id,event,this.currentQuiz.number,1,"null",this.choiceType).subscribe(data =>{
                this.dataForScore ={value:data} 
                this.navCtrl.push(ScorePage,this.dataForScore)
                console.log(data);
               
                }) 
            }else{
                this.testQuestion.updateTempPostCourse(this.userID,this.navParams.get('idCourse'),this.currentQuiz.ques_id,event,this.currentQuiz.number,1,this.ansTextarea,this.choiceType).subscribe(data =>{
                this.dataForScore ={value:data} 
                console.log(data);
                this.navCtrl.push(ScorePage,this.dataForScore)
               
                })
              }
            }
            if (this.choiceType == 4) {
              if (this.ansDropdown == undefined ||this.ansDropdown == null) {
                this.testQuestion.updateTempPostCourse(this.userID,this.navParams.get('idCourse'),this.choice[0].ques_id,event,this.currentQuiz.number,1,"null",this.choiceType).subscribe(data =>{
                this.dataForScore ={value:data}   
                this.navCtrl.push(ScorePage,this.dataForScore)
                console.log(data);
                })
              }else{
                this.testQuestion.updateTempPostCourse(this.userID,this.navParams.get('idCourse'),this.choice[0].ques_id,event,this.currentQuiz.number,1,this.ansCheckBox,this.choiceType).subscribe(data =>{
                  console.log(data);
                  
                this.dataForScore ={value:data}   
                this.navCtrl.push(ScorePage,this.dataForScore)

                })
              }
            }
    })
  }
  nextTemp(index){
    this.indexSliders = index;
    console.log('Cucumbers new state:' + this.ansCheckBox);

    this.storage.get('id').then(val =>{
      this.testQuestion.nextTempPostCourse(val[0],this.navParams.get('idCourse'),index+1).subscribe(data =>{ 
        //radio       
console.log(data);

        this.slider.slideTo(index,500);
           this.expression = true
           this.choiceDropdown = [];
           this.choiceDropdownIndex = [];
           this.choiceRadio =[]
        this.question = this.customCode.getDecodeHTMLEntities(data.question.ques_title) 
        this.lastQustion = data.last_ques
        if (data.choice.length != 0) {
          this.choice = data.choice
          this.choice.forEach((element,index) => {
            this.choiceRadio.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
          });
           //dropdown
         this.questionDropdown = this.customCode.getDecodeHTMLEntities(data.choice[0].choice_detail)
        }  
        this.choiceType = data.question.ques_type
        this.temp = data.temp_all
        this.currentQuiz = data.currentQuiz
        this.ansRadio = undefined
        let dataArray = data.currentQuiz.ans_id
          if (dataArray != null) {
            dataArray.forEach(element => {
                this.ansRadio = element                
              });
          } 
          //dropdown
          if (this.choiceType == 4) {
            for (let index = 1; index < data.choice.length; index++) {
              this.choiceDropdown.push(this.customCode.getDecodeHTMLEntities(data.choice[index].choice_detail))
              const element = data.choice[index];        
              this.choiceDropdownIndex.push(element)
            }  
          } 
      })
    })
  }
  setStatus(status,number,currentNumber){
    
        if(number == currentNumber){
           return "numbertest3"
        }else{
          if(status ==1){
            return "numbertest2"
          }else{
            return "numbertest"
          }
        }


  }
   time_test_start(time_down){
		var count = time_down;
    let time = this
	   this.interval = setInterval(() => {
			count--;
			const hours   = Math.floor(count / 3600);
			const minutes = Math.floor((count - (hours * 3600)) / 60);
			const seconds = count - (hours * 3600) - (minutes * 60);

			if (hours   < 10) {time.hours   = "0"+hours;}
			if (minutes < 10) {time.minutes = "0"+minutes;}
			if (seconds < 10) {time.seconds = "0"+seconds;}
      time.timeStr = hours+':'+minutes+':'+seconds;
      
			if(seconds == 0){
        time.storage.get('id').then(val =>{           
          time.updateTime.saveTimeExamCouser(val[0],time.navParams.get('idCourse'),count).subscribe(data =>{
            console.log(data);
              })
            })      
          } 
      if (count <= 0) {
        let alert = time.alertCtrl.create({
          title: 'แจ้งแตือน',
          message: 'หมดเวลาทำข้อสอบ',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                time.sendAns('timeup')
                // time.navCtrl.push(ScorePage,)
                // console.log('Cancel clicked');
              }
            }
          ]
        });
        alert.present();
        clearInterval(this.interval);
        //save
        
			}
		}, 1000);
  }
  ionViewDidLeave(){
    clearInterval(this.interval);
  }


}
