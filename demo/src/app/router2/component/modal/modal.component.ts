import {Component} from '@angular/core';
import {lib} from './lib';
@Component({
    templateUrl:'modal.html'
})
export class ModalComponent{
    content:any;
    lib:any=lib;
    result1:boolean;
    _content1:any={
        content:'Example lg-modal',
        btn:'double',
        type:'d',
        lg:true,
        title:'I am tiltle',
        cb:(e:boolean)=>this.result1=e
    };
}