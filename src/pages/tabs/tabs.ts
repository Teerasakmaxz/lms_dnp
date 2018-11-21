import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CourseIdPage } from "../course-id/course-id";
import { LearnreportPage } from "../learnreport/learnreport";
import { ProblemreportPage } from "../problemreport/problemreport";
import { UseraccountPage } from "../useraccount/useraccount";
import { ScorePage } from "../score/score";


// import { ReportproblemPage } from "../reportproblem/reportproblem";
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CourseIdPage;
  tab3Root = ScorePage;
  tab4Root = ProblemreportPage;
  tab5Root = UseraccountPage;
  


  constructor() {

  }
}
