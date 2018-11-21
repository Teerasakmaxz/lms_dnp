import { Component, Input, OnInit,AfterViewInit, ViewChild,ElementRef } from '@angular/core';
import { ConfigService } from '../../services/config';
import { WishlistService } from '../../services/wishlist';
@Component({
  selector: 'courseblock',
  templateUrl: 'courseblock.html'
})
export class Courseblock implements OnInit,AfterViewInit{

    active:string='';
    style:any={};
    @Input('course') course;
    
    @ViewChild('featured') featured: ElementRef;
    constructor(private wishlistService:WishlistService,private config:ConfigService) {
        console.log("MMMMM : "+ this.course)
        console.log(this.featured)
    }

    

    ngOnInit(){
      
    }

    ngAfterViewInit() {

    }
}
