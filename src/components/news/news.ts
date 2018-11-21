import { Component , Input} from '@angular/core';

/**
 * Generated class for the NewsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'news',
  templateUrl: 'news.html'
})
export class NewsComponent {
  @Input('news') news;
  text: string;

  constructor() {
    console.log('Hello NewsComponent Component');
    this.text = 'Hello World';
  }

}
