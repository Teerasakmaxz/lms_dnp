import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from '@angular/http'
import { FileTransfer } from "@ionic-native/file-transfer";
import { DocumentViewer } from "@ionic-native/document-viewer";
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';



//page
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DirectoryPage } from "../pages/directory/directory";
import { CourseIdPage } from "../pages/course-id/course-id";
import { AskAnswerPage } from "../pages/ask-answer/ask-answer";
import { InstructionPage } from "../pages/instruction/instruction";
import { LearnPage } from "../pages/learn/learn";
import { LearnreportPage } from "../pages/learnreport/learnreport";
import { ProblemreportPage } from "../pages/problemreport/problemreport";
import { UseraccountPage } from "../pages/useraccount/useraccount";
import { NewsreportPage } from "../pages/newsreport/newsreport";
import { LoginPage } from "../pages/login/login";
import { LearndetailPage } from "../pages/learndetail/learndetail";
import { PretestPage } from "../pages/pretest/pretest";
import { PosttestPage } from "../pages/posttest/posttest";
import { ChatPage } from "../pages/chat/chat";
import { InstructiondetailPage } from "../pages/instructiondetail/instructiondetail";
import { NewdetailPage } from "../pages/newdetail/newdetail";
import { ForgotpasswordPage } from "../pages/forgotpassword/forgotpassword";
import { ResetpasswordPage } from "../pages/resetpassword/resetpassword";
import { RegisterPage } from "../pages/register/register";
import { RegisterdetailsPage } from "../pages/registerdetails/registerdetails";
import { EvaluatePage } from '../pages/evaluate/evaluate';
import { VideointroducePage } from "../pages/videointroduce/videointroduce";
import { PretestQPage } from "../pages/pretest-q/pretest-q";
import { ScorePage } from "../pages/score/score";

//service
import { ConfigService } from "../services/config";
import { CourseService } from "../services/course";
import { WishlistService } from "../services/wishlist";
import { CourseIdCategory } from "../services/courseIdCategory";
import { CustomCode } from "../services/customCode";
import { AboutService } from "../services/about";
import { UsabilityForUserService } from "../services/usabilityForUser";
import { FaqService } from "../services/faq";
import { Time } from "../services/time";
import { Lesson } from "../services/lesson";
import { News } from "../services/news";
import { Login } from "../services/login";
import { Problem } from "../services/problem";
import { User } from "../services/user";
import { LearnServeice } from "../services/learn";
import { Repassword } from "../services/repassword";
import { Video } from "../services/video";
import { TestQuestion } from "../services/testQuestion";
import { UpdateTime } from "../services/updateTime";
import { Survey } from "../services/survey";
import { LoadFile } from "../services/loadfile";
import { Reg } from "../services/reg";


//component
import { Courseblock } from "../components/courseblock/courseblock";
import { Coursecard } from "../components/coursecard/coursecard";
import { CourseIdblockComponent } from "../components/course-idblock/course-idblock";
// import { LazyImgComponent } from "../components/lazy-img/lazy-img";
import { AccordionComponent } from "../components/accordion/accordion";
import { VideocomponentComponent } from "../components/videocomponent/videocomponent";
import { NewsComponent } from "../components/news/news";
import { ProgressBarComponent } from"../components/progress-bar/progress-bar"
import { TablereportComponent } from "../components/tablereport/tablereport";
import { ProgressBarlineComponent } from "../components/progress-barline/progress-barline"
import { ColabComponent } from "../components/colab/colab";
import { AskComponent } from "../components/ask/ask";
import { ExaminationComponent } from "../components/examination/examination";
import { PdfcomponentComponent } from "../components/pdfcomponent/pdfcomponent";
import { HeaderComponent } from "../components/header/header";
import { PretestComponent } from "../components/pretest/pretest";
import { EvaluatecardComponent } from '../components/evaluatecard/evaluatecard';
import { RegisterdetailsComponent } from "../components/registerdetails/registerdetails"
import { Registerdetails1Component } from "../components/registerdetails1/registerdetails1"
import { Registerdetails2Component } from "../components/registerdetails2/registerdetails2"

import { QuestionComponent } from "../components/question/question";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { LazyLoadDirective } from "../directives/lazy-load.directive";
import {IonicStorageModule } from '@ionic/storage';
import { IonicImageViewerModule } from 'ionic-img-viewer';//imgslidebox
@NgModule({
  declarations: [

  //page
  MyApp,
  AboutPage,
  ContactPage,
  HomePage,
  TabsPage,
  DirectoryPage,
  CourseIdPage,
  AskAnswerPage,
  InstructionPage,
  LearnPage,
  LearnreportPage,
  ProblemreportPage,
  UseraccountPage,
  NewsreportPage,
  LearndetailPage,
  PretestPage,
  PosttestPage,
  LoginPage,
  ChatPage ,
  InstructiondetailPage,
  NewdetailPage,
  ForgotpasswordPage,
  ResetpasswordPage,
  RegisterPage,
  RegisterdetailsPage,
  Registerdetails1Component,
  Registerdetails2Component,
  EvaluatePage,
  VideointroducePage,
  PretestQPage,
  ScorePage,
  
  //components
  Coursecard,
  Courseblock,
  CourseIdblockComponent,
  // LazyImgComponent,
  // LazyLoadDirective,
  AccordionComponent,
  VideocomponentComponent,
  NewsComponent,
  ProgressBarComponent,
  TablereportComponent,
  ProgressBarlineComponent,
  AskComponent,
  RegisterdetailsComponent ,
  Registerdetails1Component,
  Registerdetails2Component,
  ColabComponent,
  ExaminationComponent,
  PdfcomponentComponent,
  HeaderComponent,
  PretestComponent,
  QuestionComponent,
  EvaluatecardComponent
],
imports: [
  BrowserModule,
  IonicModule.forRoot(MyApp),
  IonicStorageModule.forRoot(),
  HttpModule,
  IonicStorageModule,
  IonicImageViewerModule, //imgslidebox
],
bootstrap: [IonicApp],
entryComponents: [
  //page
  MyApp,
  AboutPage,
  ContactPage,
  HomePage,
  TabsPage,
  DirectoryPage,
  CourseIdPage,
  AskAnswerPage,
  InstructionPage,
  LearnPage,
  LearnreportPage,
  ProblemreportPage,
  UseraccountPage,
  NewsreportPage,
  LearndetailPage,
  PretestPage,
  PosttestPage,
  LoginPage,
  ChatPage ,
  InstructiondetailPage,
  NewdetailPage, 
  VideointroducePage,
  PretestQPage,
  ScorePage,
  ForgotpasswordPage,
  ResetpasswordPage,
  RegisterPage,
  RegisterdetailsPage,
  EvaluatePage,
  
  


],
  providers: [
    Camera,
    File,
    FileTransfer,
    DocumentViewer,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    //service
    ConfigService,
    CourseService,
    WishlistService,
    CourseIdCategory,
    CustomCode,
    AboutService,
    UsabilityForUserService,
    FaqService,
    Time,
    Lesson,
    News,
    Login,
    Problem,
    User,
    LearnServeice,
    Repassword,
    Video,
    TestQuestion,
    UpdateTime,    
    Survey,
    LoadFile,
    Reg
  ]
})
export class AppModule {}
