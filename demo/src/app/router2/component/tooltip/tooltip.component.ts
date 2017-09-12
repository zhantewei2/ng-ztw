import {Component} from '@angular/core';
import {lib} from './lib';
@Component({
    templateUrl:'tooltip.html'
})
export class TooltipComponent{
    posArr:Array<string>=['top','left','right','bottom'];
    lib:any=lib;
    globCode:string=lib.globCode;
}