import {Component} from '@angular/core';
import {lib} from './lib';
import {MainService} from '../../../main.service';
@Component({
    templateUrl:'tab.html'
})
export class TabComponent{
    tabType:any='d';
    selectItem:number=1;
    lib:any=lib;
    selectList=['tab1','tab2','tab3'];
    constructor(
        public main:MainService
    ){}
}