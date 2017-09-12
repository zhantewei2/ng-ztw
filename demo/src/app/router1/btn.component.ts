import {Component} from '@angular/core';
import {MainService} from '../main.service';
@Component({
    templateUrl:'./btn.html'
})
export class BtnComponent{
    btnSize:Array<any>=['sm','','lg'];
    constructor(public _main:MainService){}
    select1:any;
    select2:any;
}