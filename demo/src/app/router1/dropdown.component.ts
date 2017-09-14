import {Component} from '@angular/core';
import {lib} from './lib/main';
import {MainService} from '../main.service';
@Component({
    templateUrl:'./dropdown.html'
})
export class DropdownComponent{
    lib=lib;
    btnArr:Array<any>=[
        {dr:'',show:false},
        {dr:'-top',show:false},
        {dr:'-left',show:false},
        {dr:'-right',show:false}
    ];
   constructor(public main:MainService){
       this.colorArr=main.allColors.map((color:string)=>{return {color:color,show:false,select:null}})
   }
   colorArr:any=[];
    menuList:Array<string>=[
        'list1',
        'list2',
        'list3',
        'list4'
    ]

    showList:boolean;
    listSelect:any;
}