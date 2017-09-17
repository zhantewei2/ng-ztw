import {Component,Input,ElementRef} from '@angular/core';
import {Router} from '@angular/router';
@Component({
    selector:'frag-item',
    template:`
        <div>
            <h1 [ngz-clickCopy]="locationHref" (click)="navTo()" (mouseenter)="hidLink=false" (mouseleave)="hidLink=true" class="text-center rel">
                {{frag}}
                <span [hidden]="hidLink" class="abs-tl color-w">
                    <i class="fa fa-link"></i>
                </span>
            </h1>
            
        </div>
        <hr>
        <ng-content></ng-content>
    `,
    host:{
        class:'block'
    }
})
export class FragItemComponent{
    @Input()frag:any;
    constructor(
        public _el:ElementRef,
        private router:Router
    ){};
    ngOnInit(){
        this.locationHref=location.href.replace(/#\w+$/,'')+'#'+this.frag
    }
    locationHref:any;
    _frag:any;
    hidLink:boolean=true;
    navTo=()=>{};
}