import {Component,ViewChild} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {MainService} from '../main.service';

@Component({
    templateUrl:'./home.html'
})
export class HomeComponent{
    name:string='css';

    @ViewChild('navTp')navTp:any;
    constructor(
        public _main:MainService,
        private router:Router,
        private route:ActivatedRoute
    ){}
    ngAfterViewInit(){
        setTimeout(()=>{
            this._main.navTp=this.navTp;
            },1);
    }
    noString=(val:any)=>typeof val !='string';
    cgList:Array<any>=[
        'btn',
        'nav',
        'list-group',
        'input',
        'card',
        'dropdown',
        'tooltip',
        'badge',
        'table',
        'alert'
    ]
    selectCg:string;
    selectNav:string;

}