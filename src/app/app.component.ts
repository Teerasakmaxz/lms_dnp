import { Component,OnInit,ViewChild } from '@angular/core';
import { Platform ,NavController,App,MenuController,LoadingController,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from "../pages/about/about";
import { DirectoryPage } from "../pages/directory/directory";
import { AskAnswerPage } from "../pages/ask-answer/ask-answer";
import { InstructionPage } from "../pages/instruction/instruction";
import { ContactPage } from "../pages/contact/contact";
import { NewsreportPage } from "../pages/newsreport/newsreport";
import { LoginPage } from "../pages/login/login";
import { VideointroducePage } from "../pages/videointroduce/videointroduce";
import { Storage } from "@ionic/storage";
import { User } from "../services/user";
import { ConfigService } from "../services/config";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  rootPage:any;
  pages: any[] = [];
  loader: any;
  name:any
  username:any

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
     statusBar: StatusBar, 
     splashScreen: SplashScreen,
     private config : ConfigService,
     private app :App,
     private loadingCtrl: LoadingController,
     private menuCtrl : MenuController,
     private storage : Storage,
     private user:User,
     public events: Events
    ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.events.subscribe("dataUser",(dataUser)=>{        
        this.name = dataUser[0]
      })
      this.storage.get('id').then((val) =>{
        if (val==null || val == undefined || val == "") {
          this.rootPage = LoginPage
        } else {
          this.user.dataForUser(val[0]).subscribe(data =>{
              this.name = data[0]
          })
          this.rootPage = TabsPage
        }
      })
    });
    this.pages = [
      { title: config.get_translation('home_menu_title'), component: TabsPage, index: 0, hide: false,icon:'assets/dnp_mobile_asset/Path 313.png' },
      { title: config.get_translation('video_introduce'), component: VideointroducePage, index: 1, hide: false,icon:'assets/icon/play.svg'},
      { title: config.get_translation('newsreport_menu_title'), component: NewsreportPage, index: 2, hide: false,icon:'assets/dnp_mobile_asset/Group 226.png' },
      { title: config.get_translation('about_menu_title'), component: AboutPage, index: 3, hide: false,icon:'assets/dnp_mobile_asset/Profile.png' },
      { title: config.get_translation('grouping_title'), component: DirectoryPage, index: 4, hide: false,icon:'assets/dnp_mobile_asset/Sections.png' },
      { title: config.get_translation('instruction_menu_title'), component: InstructionPage, index: 5, hide: false,icon:'assets/dnp_mobile_asset/Compose.png' },
      { title: config.get_translation('ask_and_answer_menu_title'), component: AskAnswerPage, index: 6, hide: false,icon:'assets/dnp_mobile_asset/Help.png' },
      { title: config.get_translation('contact_menu_title'), component: ContactPage, index: 7, hide: false,icon:'assets/dnp_mobile_asset/Warning.png' },

    ];
  }
  ngOnInit(){
    this.config.initialize();
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
        //content: "Loading..."
    });
    this.loader.present();
}

  onLoad(page: any) {
    let nav = this.app.getRootNav();
    nav.setRoot(page.component,{ index: page.index });
    this.menuCtrl.close();
}
  logOut(){
    // this.pages=[]
    
    this.storage.clear()
      this.nav.setRoot(LoginPage)
      this.menuCtrl.close();
  }
}
