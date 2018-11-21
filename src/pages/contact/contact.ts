import { Component, ViewChild, ElementRef } from '@angular/core';
import { ConfigService } from '../../services/config';



declare var google;

@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage {
	@ViewChild('map') mapElement: ElementRef;
	map: any;
	userdata: any;
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer;

	constructor(public config: ConfigService,

  ) {
		if (this.config.isLoggedIn) {
			this.userdata = { 'isLoggedIn': this.config.isLoggedIn, 'User': this.config.user };
		}	
	}
	ionViewDidLoad() {
		console.log('element #map:'+this.mapElement);
		this.loadMap();
		console.log('map:'+this.map);
	}
	  loadMap() {
		var uluru = { lat: 13.850681, lng: 100.579875};
		this.map = new google.maps.Map(this.mapElement.nativeElement, {
		  zoom: 18,
		  tilt: 30,
		  center: uluru
		});
		var marker = new google.maps.Marker({
		  position: uluru,
		  map: this.map
		});
	
	  }
	
}
