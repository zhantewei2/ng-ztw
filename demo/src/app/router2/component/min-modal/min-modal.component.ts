import {Component} from '@angular/core';
import {MainService} from '../../../main.service';
import {lib} from './lib';
@Component({
    templateUrl:'min-modal.html'
})
export class MinModalComponent{
    modalValue:any;
    modalType:string;
    lib:any=lib;
    constructor(public main:MainService){}
}