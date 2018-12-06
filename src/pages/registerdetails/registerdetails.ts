import { Injectable, Component, ViewChild } from '@angular/core';
import {  NavController, NavParams, Slides, AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ConfigService } from '../../services/config';
import { RegisterPage } from '../register/register';
import { RegisterdetailsComponent } from "../../components/registerdetails/registerdetails";
import { LoginPage } from "../login/login";
import { User } from "../../services/user";
import { Reg } from "../../services/reg";
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-registerdetails',
  templateUrl: 'registerdetails.html',
})
export class RegisterdetailsPage {
  [x: string]: any;
  @ViewChild('mySlider') slider: Slides;
  numeric = 0;
  value: any
  itemsProvinceService:any
  //slide 1
  idcard: any;
  email: any;
  //slide 2
  typeprefix: any;
  firstname: any;
  lastname: any;
  teluser: any;
  //slide 3
  groupJob: any;
  province:any
  position: any;
  address:any
  company:any
  zipcode:any
  status: boolean = false;
  text:any


  public	photos :any
 public base64Image:string
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController,private provinceService:User,
    private reg:Reg,private camera: Camera,private transfer: FileTransfer,
    ) {
      this.provinceService.province().subscribe(data=>{
      this.itemsProvinceService =data  
        console.log(data);
        
      })
  }
  ionViewDidLoad() {
    this.base64Image = 'assets/icon/adduserPhoto.svg'
    this.slider.lockSwipeToNext(true)
    this.slider.lockSwipeToPrev(true)
    this.text = "ถัดไป"
  }
  goToSlide() {
    if (this.numeric == 0) {
      this.text = "ถัดไป"
      if (this.idcard != undefined && this.email != undefined && this.idcard != "" && 
      this.email != "" && this.typeprefix != "" && this.typeprefix != undefined && this.firstname != "" && this.firstname != undefined &&
      this.lastname != "" && this.lastname != undefined) {
        if (this.checkID(this.idcard)) {
            this.numeric++
        } else {
          let alert = this
          .alertCtrl
          .create({
            title: 'แจ้งเตือน', subTitle: 'ตรวจสอบเลขบัตรประชาชน', buttons: ['ตกลง'],
            cssClass: 'profalert'
          });
        alert.present();
        }
      }else{
        let alert = this
        .alertCtrl
        .create({
          title: 'แจ้งเตือน', subTitle: 'กรุณากรอกให้ครบ', buttons: ['ตกลง'],
          cssClass: 'profalert'
        });
      alert.present();
      }

      //เช็คช่องกรอก
      // slide 2
    }
    else if (this.numeric == 1) {
      this.text = "ถัดไป"

      if (this.teluser != undefined  && this.teluser != "" && this.address != "" 
      && this.address != undefined && this.province != "" && this.province != undefined
      && this.zipcode != "" && this.zipcode != undefined)
       {
        if(this.teluser.length == 10){
          if (this.zipcode.length == 5) {
            this.numeric++
           
            
          }
        }else{
          let alert = this
          .alertCtrl
          .create({
            title: 'แจ้งเตือน', subTitle: 'กรุณากรอกให้ครบ 10 ตัว', buttons: ['ตกลง'],
            cssClass: 'profalert'
          });
        alert.present();
        }
      }else{
        let alert = this
        .alertCtrl
        .create({
          title: 'แจ้งเตือน', subTitle: 'กรุณากรอกให้ครบ', buttons: ['ตกลง'],
          cssClass: 'profalert'
        });
      alert.present();
      }
      //เช็คช่องกรอก
      // slide 3     
    } else if (this.numeric == 2) {
      this.text = "สมัครสมาชิก"
      if (this.position != undefined && this.position != "" && this.company != undefined 
      && this.company != "" && this.groupJob != "" && this.groupJob != undefined) 
      { 
        this.numeric++ 
      }else{
        let alert = this
        .alertCtrl
        .create({
          title: 'แจ้งเตือน', subTitle: 'กรุณากรอกให้ครบ', buttons: ['ตกลง'],
          cssClass: 'profalert'
        });
      alert.present();
      }
      //เช็คช่องกรอก
    }else if (this.numeric == 3) {      
      this.text = "สมัครสมาชิก"
      if (this.base64Image != null || this.base64Image != undefined || this.base64Image != '') {        
        this.reg.register(this.firstname,this.lastname,this.idcard,this.email,this.typeprefix,
          this.groupJob,this.province,this.position,this.address,this.company,
          this.zipcode,this.teluser).subscribe(data =>{
            this.uploadFile()
            this.provinceService.updateImageName(data[0].name,data[0].id).subscribe(val =>{
            })
            let alert = this
            .alertCtrl
            .create({
              title: 'แจ้งเตือน', subTitle: 'สมัครสมาชิกเรียบร้อย กรุณาตรวจสอบ e-mail',     
              buttons: [
                {
                  text: 'ตกลง',
                  role: 'ตกลง',
                  handler: () => {
                    this.navCtrl.push(LoginPage)
                }
                }
              ]
            });
          alert.present();            
        })
      } else {
        let alert = this
        .alertCtrl
        .create({
          title: 'แจ้งเตือน', subTitle: 'กรุณาใส่รูป',     
          buttons: [
            {
              text: 'ตกลง',
              role: 'ตกลง',
              handler: () => {
                alert.dismiss()
            }
            }
          ]
        });
      alert.present();
      }
 
    }    
    this.slider.lockSwipeToNext(false)
    this.slider.slideTo(this.numeric, 500);
    this.slider.lockSwipeToNext(true)

  }
  slidePrev() {
    this.numeric--
    this.slider.lockSwipeToPrev(false)
    this.slider.slidePrev(500, true)
    this.slider.lockSwipeToPrev(true)
    if (this.numeric < 0) {
      this.navCtrl.popTo(RegisterPage)
    }
  }
  checkID(id){
  let sum =0 
  if(id.length != 13){    
  return false;
  }
  for(let i=0; i < 12; i++){
  sum += parseFloat(id.charAt(i))*(13-i);
  }
  if((11-sum%11)%10!=parseFloat(id.charAt(12))){
    return false; 
  }
    return true;
}
takePhoto(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
    
    }, (err) => {
     // Handle error
    });
  // console.log("ถ่ายรูป");
  
}
uploadFile() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: "multipart/from-data",
    }
    fileTransfer.upload(this.base64Image, 'http://203.154.117.72:13000/User/profile', options)
      .then((data) => {
     console.log(data)  
    }, (err) => {
    console.log(err)
    });
  }

}
