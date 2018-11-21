import { Component , Input} from '@angular/core';
import { CustomCode } from "../../services/customCode";
import { Time } from "../../services/time";
@Component({
  selector: 'course-idblock',
  templateUrl: 'course-idblock.html'
})


export class CourseIdblockComponent {

public course_title:any
public course_detail:any
public course_date_start:any
public course_date_end:any
public course_short_title : any
  @Input('course') course;
  constructor(
    private customCode:CustomCode,
    private time : Time
  ) {
   
  }
  ngOnInit(){
this.course_detail = this.customCode.getDecodeHTMLEntities(this.course.description)
// this.course_short_title = this.customCode.getDecodeHTMLEntities(this.course.course_short_title)
// this.course_date_start = this.time.getDecodeHTMLTime(this.course.course_date_start)
// this.course_date_end = this.time.getDecodeHTMLTime(this.course.course_date_end)
  }
}
