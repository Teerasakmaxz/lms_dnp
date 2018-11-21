import { Component, ViewChild, Renderer,Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CustomCode } from "../../services/customCode";
/**
 * Generated class for the ColabComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'colab',
  templateUrl: 'colab.html'
})
export class ColabComponent {

  accordionExapanded = false;
  @Input("data") data:any
  @ViewChild("cc") cardContent: any;
  gg:any

  icon: string = "arrow-forward";

  constructor(public renderer: Renderer
    ,public navCtrl: NavController, 
    public navParams: NavParams,
    private customCode:CustomCode
  ) {

  }

  ngOnInit() {
    this.gg =this.customCode.getDecodeHTMLEntities(this.data.faq_THanswer)
    this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 700ms, padding 1000ms");
    this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
    this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");
  }

  toggleAccordion() {
    if (this.accordionExapanded) {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");

    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
    }

    this.accordionExapanded = !this.accordionExapanded;
    this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";

  }
}
