import {Component} from '@angular/core';
import {MainService} from '../../main.service';
import {lib} from './lib';
@Component({
    templateUrl:'./alert.html'
})
export class AlertComponent{
    constructor(public main:MainService){}
    lib:any=lib;
}