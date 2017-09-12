import {Component,forwardRef,Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ToolService} from '../../tool/tool.service';
import {pop} from '../../animate/base';
@Component({
    selector:'ngz-min-modal',
    template:`
<div [@Pop] class="min-modal" *ngIf="isOpen">
    <span (click)="close()" class="color-{{type}} close abs-tr-0" >&times;</span>
    <div class="rel">
    </div>
    <p class="color-{{type}}">{{value}}
    </p>
</div>`,
    providers:[
        {provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>MinModalComponnet),multi:true}
    ],
    host:{
        'class':'fix-center'
    },
    animations:[pop()]
})
export class MinModalComponnet{
    constructor(public tool:ToolService){}
    @Input()type:string='';
    value:any;
    changeFn:any;
    isOpen:boolean;
    open(){
        if(this.isOpen)return;
        this.isOpen=true;
        setTimeout(()=>this.tool.listenOnce(document,'click',this.close.bind(this)));
    }
    close(){
        if(!this.isOpen)return;
        this.isOpen=false;
        this.changeFn(null);
    }
    registerOnTouched(){}
    registerOnChange(fn:any){
        this.changeFn=fn;
    }
    writeValue(value:any){
        if(!value)return;
        this.value=value;
        this.open();
    }
}