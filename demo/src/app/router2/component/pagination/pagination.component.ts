import {Component} from '@angular/core';
import {MainService} from '../../../main.service';
import {lib} from './lib';
@Component({
    templateUrl:'./pagination.html'
})
export class PaginationComponent{
    lib:any=lib;
    pageValue:number=1;
    pageValue2:number=1;
    type2:string='o-w';
    btnSize2:string;
    sizeArr=['default','sm','lg'];
    constructor(public main:MainService){}
}