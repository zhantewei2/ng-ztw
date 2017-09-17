import {Component,ViewChild} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {MainService} from '../main.service';
import {RouterOneService} from './service/router1.service';
@Component({
    templateUrl:'./home.html',
    providers:[RouterOneService]
})
export class HomeComponent{
    name:string='css';

    @ViewChild('navTp')navTp:any;
    constructor(
        public _main:MainService,
        private router:Router,
        private route:ActivatedRoute,
        public _rs:RouterOneService
    ){

    }
    isUtil:boolean;
    activate(e:any){
        this.isUtil=!!e.navName;
        this._main.repairH();
    }
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
        'alert',
        'utilities'
    ];
    selectCg:string;
    selectNav:string;

}