
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
 * Generated class for the PretestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pretest',
  templateUrl: 'pretest.html',
})
export class PretestPage {
  @ViewChild('mySlider') slider: Slides;
  currentQuizTime:any
  ansTextarea:any
  ansDropdown:any
  ansRadio:any
  ansCheckBox:any =[]
  indexSliders:any =0
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
  notopic :any = 1
  //time
   hours :any = 0;
  minutes:any = 0;
 seconds:any = 0;
  timeStr:any = "99:99:99";
  interval :any
  choice1:any
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public config:ConfigService,private storage:Storage,
  private testQuestion:TestQuestion,private viewController :ViewController,private customCode:CustomCode,
  private updateTime:UpdateTime,private alertCtrl: AlertController) {

  }
  ngOnInit(){
    this.slider.lockSwipeToPrev(true)
    this.slider.lockSwipeToNext(true)
    this.storage.get('id').then(val =>{
      this.testQuestion.test(val[0],this.navParams.get('idLesson')).subscribe(data =>{
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
         if (this.currentQuiz.number != 0) {
          this.indexSliders =  this.currentQuiz.number
         }
         this.time_test_start(this.currentQuizTime)
        let dataArray = JSON.parse(data.currentQuiz.ans_id)        
       if (dataArray != null || dataArray!=undefined || dataArray != "") {
         if (dataArray != null) {
           dataArray.forEach(element => {
               this.ansRadio = element                
             });
         } 
       }
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
    this.indexSliders++
    if (this.ansRadio != undefined || this.ansRadio != null || 
      this.ansDropdown != undefined ||this.ansDropdown != null || 
      this.ansTextarea != undefined || this.ansTextarea != null ||
      this.ansCheckBox.length > 0) {
      this.storage.get('id').then(val =>{
        if (this.choiceType == 1) {
          if (this.ansCheckBox != null || this.ansCheckBox != undefined) {
            this.testQuestion.updateTemp(val[0],this.navParams.get('idLesson'),this.choice[0].ques_id,'next',this.currentQuiz.number,"",this.ansCheckBox,this.choiceType).subscribe(data =>{
              this.slider.lockSwipeToPrev(false)
              this.slider.lockSwipeToNext(false) 
              this.slider.slideTo(this.indexSliders,500);
              this.slider.lockSwipeToPrev(true)
              this.slider.lockSwipeToNext(true)
              this.expression = true
              this.choiceDropdown = [];
              this.choiceDropdownIndex = [];
              this.choiceRadio =[]
              this.lastQustion = data.last_ques
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
              this.currentQuiz = data.currentQuiz
              let dataArray = JSON.parse(data.currentQuiz.ans_id)
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
          }
        }
        if (this.choiceType == 2) {
          if (this.ansRadio != undefined || this.ansRadio != null) {
            this.testQuestion.updateTemp(val[0],this.navParams.get('idLesson'),this.choice[0].ques_id,'next',this.currentQuiz.number,"",this.ansRadio,this.choiceType).subscribe(data =>{              
              this.slider.lockSwipeToPrev(false)
              this.slider.lockSwipeToNext(false) 
              this.slider.slideTo(this.indexSliders,500);
              this.slider.lockSwipeToPrev(true)
              this.slider.lockSwipeToNext(true)
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
              let dataArray = JSON.parse(data.currentQuiz.ans_id)
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
          this.testQuestion.updateTemp(val[0],this.navParams.get('idLesson'),this.choice[0].ques_id,'next',this.currentQuiz.number,"",this.ansTextarea,this.choiceType).subscribe(data =>{
            this.slider.lockSwipeToPrev(false)
            this.slider.lockSwipeToNext(false) 
            this.slider.slideTo(this.indexSliders,500);
            this.slider.lockSwipeToPrev(true)
            this.slider.lockSwipeToNext(true)
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
            let dataArray = JSON.parse(data.currentQuiz.ans_id)
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
          this.testQuestion.updateTemp(val[0],this.navParams.get('idLesson'),this.choice[0].ques_id,'next',this.currentQuiz.number,"",this.ansDropdown,this.choiceType).subscribe(data =>{
            this.slider.lockSwipeToPrev(false)
            this.slider.lockSwipeToNext(false) 
            this.slider.slideTo(this.indexSliders,500);
            this.slider.lockSwipeToPrev(true)
            this.slider.lockSwipeToNext(true)
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
            let dataArray = JSON.parse(data.currentQuiz.ans_id)
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
      this.testQuestion.updateTemp(val[0],this.navParams.get('idLesson'),null,'next',this.currentQuiz.number,"","null","null").subscribe(data =>{
        this.slider.lockSwipeToPrev(false)
        this.slider.lockSwipeToNext(false) 
        this.slider.slideTo(this.indexSliders,500);
        this.slider.lockSwipeToPrev(true)
        this.slider.lockSwipeToNext(true)
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
        let dataArray = JSON.parse(data.currentQuiz.ans_id)
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
  } 
}
  prev(){    
    this.storage.get('id').then(val =>{
      this.testQuestion.updateTemp(val[0],this.navParams.get('idLesson'),"null",'previous',this.currentQuiz.number,"","null","null").subscribe(data =>{

        if (this.indexSliders > 0 ) {
          this.indexSliders--
  
          this.slider.lockSwipeToPrev(false)
          this.slider.lockSwipeToNext(false) 
          this.slider.slideTo(this.indexSliders,500);
          this.slider.lockSwipeToPrev(true)
          this.slider.lockSwipeToNext(true)
  
      }
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
        let dataArray = JSON.parse(data.currentQuiz.ans_id)
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

  }
  sendAns(event){
    this.storage.get('id').then(val =>{
          this.userID =val[0]
          if (this.choiceType == 1) {
            if (this.ansCheckBox == null || this.ansCheckBox == undefined) {
              this.testQuestion.updateTemp(this.userID,this.navParams.get('idLesson'),this.choice[0].ques_id,event,this.currentQuiz.number,1,"null",this.choiceType).subscribe(data =>{                
                this.dataForScore ={value:data} 
                this.navCtrl.push(ScorePage,this.dataForScore)
               
              })
            }else{
              this.testQuestion.updateTemp(this.userID,this.navParams.get('idLesson'),this.choice[0].ques_id,event,this.currentQuiz.number,1,this.ansCheckBox,this.choiceType).subscribe(data =>{
                this.dataForScore ={value:data}   
                this.navCtrl.push(ScorePage,this.dataForScore)
             
              })
            }
          }
            if (this.choiceType == 2) {
              if (this.ansRadio == undefined || this.ansRadio == null) {
                this.testQuestion.updateTemp(this.userID,this.navParams.get('idLesson'),this.choice[0].ques_id,event,this.currentQuiz.number,1,"null",this.choiceType).subscribe(data =>{
                  this.dataForScore ={value:data} 
                  this.navCtrl.push(ScorePage,this.dataForScore)
               
                })
              } else{
                this.testQuestion.updateTemp(this.userID,this.navParams.get('idLesson'),this.choice[0].ques_id,event,this.currentQuiz.number,1,this.ansRadio,this.choiceType).subscribe(data =>{
                this.dataForScore ={value:data}   
                this.navCtrl.push(ScorePage,this.dataForScore)
                
             
                })
              }
            }
            if (this.choiceType == 3) {
              if (this.ansTextarea == undefined || this.ansTextarea == null) {
                this.testQuestion.updateTemp(this.userID,this.navParams.get('idLesson'),this.currentQuiz.ques_id,event,this.currentQuiz.number,1,"null",this.choiceType).subscribe(data =>{
                this.dataForScore ={value:data} 
                this.navCtrl.push(ScorePage,this.dataForScore)
                
               
                }) 
            }else{
                this.testQuestion.updateTemp(this.userID,this.navParams.get('idLesson'),this.currentQuiz.ques_id,event,this.currentQuiz.number,1,this.ansTextarea,this.choiceType).subscribe(data =>{
                this.dataForScore ={value:data} 
                
                this.navCtrl.push(ScorePage,this.dataForScore)
               
                })
              }
            }
            if (this.choiceType == 4) {
              if (this.ansDropdown == undefined ||this.ansDropdown == null) {
                this.testQuestion.updateTemp(this.userID,this.navParams.get('idLesson'),this.choice[0].ques_id,event,this.currentQuiz.number,1,"null",this.choiceType).subscribe(data =>{
                this.dataForScore ={value:data}   
                this.navCtrl.push(ScorePage,this.dataForScore)
                
                })
              }else{
                this.testQuestion.updateTemp(this.userID,this.navParams.get('idLesson'),this.choice[0].ques_id,event,this.currentQuiz.number,1,this.ansCheckBox,this.choiceType).subscribe(data =>{
                  
                  
                this.dataForScore ={value:data}   
                this.navCtrl.push(ScorePage,this.dataForScore)

                })
              }
            }
    })
  }
  nextTemp(index){    
    this.indexSliders = index;
    this.storage.get('id').then(val =>{
      this.testQuestion.nextTemp(val[0],this.navParams.get('idLesson'),index).subscribe(data =>{ 
        
        //radio       
    this.slider.lockSwipeToPrev(false)
    this.slider.lockSwipeToNext(false) 
    this.slider.slideTo(this.indexSliders,500);
    this.slider.lockSwipeToPrev(true)
    this.slider.lockSwipeToNext(true)          
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
        let dataArray = JSON.parse(data.currentQuiz.ans_id)
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
          time.updateTime.saveTimeExam(val[0],time.navParams.get('idLesson'),count).subscribe(data =>{
            console.log(data);
              })
            })      
          } 
      if (count < 0) {
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
        clearInterval(time.interval);
        //save
        
			}
		}, 1000);
  }
  ionViewWillLeave(){
    // this.updateTime.saveTimeExam(this.userID,this.navParams.get('idLesson'),count).subscribe(data =>{
    //   console.log(data);
    //     })
    clearInterval(this.interval);
  }
  ionViewDidLeave(){
    // this.updateTime.saveTimeExam(this.userID,this.navParams.get('idLesson'),count).subscribe(data =>{
    //   console.log(data);
    //     })
    clearInterval(this.interval);
  }


}
