import {Component,ViewChild} from '@angular/core';
import {lib,apiLib,apiLib2} from './lib';

import {MainService} from '../../../main.service';
@Component({
    templateUrl:'scroll.html'
})
export class ScrollComponent{
    lib:any=lib;
    constructor(
        public main:MainService
    ){}
    @ViewChild('exhibition')exhibition:any;
    scrollValue:any;
    scrollList=['a','b','c','d','e'];
    change(e:any){}
    apiLib:any=apiLib;
    apiLib2:any=apiLib2;
}