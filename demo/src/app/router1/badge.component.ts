import {Component} from '@angular/core';
import {MainService} from '../main.service';
@Component({
    templateUrl:'./badge.html'
})
export class BadgeComponent{
    constructor(
        public _main:MainService
    ){
      const  tags=['em','var','samp','kbd'];
      let str:any='';
      tags.forEach((v:string)=>{
          str+=`<tr><td><${v}> tag: ${v}</${v}></td><td> &lt;${v}&gt; </td></tr>`
      })
      this.tagsHTML=str;
    }
    tagsHTML:any;
    code1:string=`
         <span  [style.fontSize]="10+5*index+'px'" class="b-{{i}}" *ngFor="let i of _main.allColors;index as index">b-{{i}}</span>
    `;

}