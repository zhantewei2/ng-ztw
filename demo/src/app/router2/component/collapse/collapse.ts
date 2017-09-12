import {Component} from '@angular/core';
import {MainService} from '../../../main.service';
import {lib} from './lib';
@Component({
    templateUrl:'./collapse.html'
})
export class CollapseComponent{
    constructor(public _main:MainService){}
    useType:string='l';
    lib:any=lib;
    code1:string=`
    
    `
}