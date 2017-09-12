import {Component,Input,ElementRef} from '@angular/core';
@Component({
    selector:'ngz-progress-bar',
    template:`        
            <div [style.width.%]="width" [ngClass]="
            ['bg-'+type,'progress-bar',stripe?'progress-strip':'',animate?'progress-bar-animate':'']">
                {{showValue?width+'%':''}}
            </div>
    `,
    host:{
        'class':'progress-container'
    }
})
export class ProgressBarComponent{
    constructor(private _el:ElementRef){}
    @Input()stripe:boolean;
    @Input()type:string='p';
    @Input()set size(val:string){
        if(!val)return;
        this._el.nativeElement.classList.add('progress-'+val);
    }
    @Input()max:number=100;
    @Input()value:number;
    @Input()showValue:boolean;
    @Input()animate:boolean;
    width:number=10;
    preValue:number;
    preMax:number=this.max;
    ngOnChanges(){
        if(this.value!==undefined&&this.max&&(this.value!=this.preValue||this.max!=this.preMax)){
            const max=this.max,val=this.value;
            this.width=Math.round(100*val/max);
        }
    }
}