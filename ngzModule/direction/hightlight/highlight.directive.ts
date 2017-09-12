import {Directive,Input,ElementRef} from '@angular/core';
import {hHtml} from './lib/html';
import {hJs} from './lib/js';
@Directive({
    selector:'[highlight]',
    host:{
        'class':'auto'
    }
})
export class Highlight{
    constructor(
        private _el:ElementRef
    ){}
    filterTag:any=(val:string)=>val.replace(/</g,'&lt;').replace(/>/g,'&gt;');
    @Input()language:string='html';//default 'html', options: 'js;
    @Input()stripe:boolean=false;
    @Input()set highlight(val:string) {
        if(!val)return;
        val = this.filterTag(val);
        let listVal=val.split(/\n/);
        let tableClass='z-hLight-table';
        if(this.stripe)tableClass+=' stripe';
        let str=`<table class="${tableClass}">`;
        listVal.forEach((v:string,index:number)=>{
            str+=`<tr><td>${index}</td><td>${v}</td></tr>`;
        })
        str+='</table>';
        switch (this.language){
            case 'html':
                str=hHtml(str);
                break;
            case 'js':
                str=hJs(str);
        }
        this._el.nativeElement.innerHTML = str;
    }


}