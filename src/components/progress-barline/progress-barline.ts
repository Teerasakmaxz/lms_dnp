import { Component ,Input } from '@angular/core';

/**
 * Generated class for the ProgressBarlineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-barline',
  templateUrl: 'progress-barline.html'
})
export class ProgressBarlineComponent {

 @Input('progressline') progressline;
  constructor() {
    
  }

}
