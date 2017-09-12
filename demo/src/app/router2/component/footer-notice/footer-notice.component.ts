import {Component} from '@angular/core';
import {MainService} from '../../../main.service';
import {lib} from './lib';
@Component({
    templateUrl:'footer-notice.html'
})
export class FooterNoticeComponent{
    lib:any=lib;
    footerValue:any;
    footerType:string;
    constructor(public main:MainService){};
    showFooter(type:string){
        this.footerValue=`The type is <a class="b-${type}">'${type}'</a>`;
        this.footerType=type;
    }
}