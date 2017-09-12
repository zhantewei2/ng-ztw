import {Component,Input,forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {verticalUp} from '../../animate/base';
import {ToolService} from '../../tool/tool.service';
@Component({
    selector:'ngz-footer-notice',
    template:`
        <div class="fix-bottom">
            <div *ngIf="value" [@VerticalUp] class="alert-{{type}}" style="min-width:15em;">
                <span (click)="close()" class="close">&times;</span>
                <a *ngIf='isStr(value)' [innerHTML]="value"></a>
                <a *ngIf="!isStr(value)" [innerTp]="value"></a>
            </div>
        </div>
    `,
    providers:[
        {provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>FooterNoticeComponent),multi:true}
    ],
    animations:[verticalUp()]
})
export class FooterNoticeComponent{
    constructor(
        public tool:ToolService
    ){};
    //timeout(ms);
    @Input()timeout:number=2000;
    type:string='p';
    @Input('type')set _type(val:string){
        if(val)this.type=val;
    }
    ngOnInit(){
        if(this.timeout)this.timer=new this.tool.timerTool(this.timeout);
    }
    timer:any;
    value:string;
    changeFn:any;
    timerClear:any
    registerOnTouched(){}
    registerOnChange(fn:any){
        this.changeFn=fn;
    }
    isStr=(val:any)=>typeof val=='string';
    writeValue(value:any){
        if(!value)return;
        if(this.timer) {
            this.timer.finish();
            this.timer.next(() => this.close());
        }
        this.value=value;
    }
    close(){
        if(this.timer)this.timer.finish();
        this.changeFn(this.value=null);
    }
}