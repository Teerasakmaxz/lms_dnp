import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config';

import { CustomCode } from "../../services/customCode";
@Component({
  selector: 'ask',
  templateUrl: 'ask.html'
})
export class AskComponent {

	@Input('course') course:any;
	public topic:any;
	public title : any;
    public detail : any;
    public image : any;
    constructor(
        private config:ConfigService,
        private customCode : CustomCode
    ) {
   
        }

    ngOnInit(){
            this.title = this.course.usa_title
            this.detail = this.customCode.getDecodeHTMLEntities(this.course.usa_detail)
    }
}
