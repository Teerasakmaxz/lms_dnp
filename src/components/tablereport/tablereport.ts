import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { NavController, NavParams ,Slides} from 'ionic-angular';
import { ProblemreportPage  } from "../../pages/problemreport/problemreport";
import { ChatPage } from "../../pages/chat/chat";
import { Time } from "../../services/time";

@Component({
  selector: 'tablereport',
  templateUrl: 'tablereport.html'
})
export class TablereportComponent implements OnInit{

  @Input('history') history:any
  date:any
  month:any
  constructor(public navControl:NavController,public navParam:NavParams,private time :Time) {

  }
  ngOnInit(){
    this.date = this.time.getDecodeHTMLTime(this.history.create_date)
  }
  clickcard() {
    // this.navControl.push(ChatPage)
  }
 
}
