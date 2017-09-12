import {Component,Input} from '@angular/core';
import {collapse} from '../../animate/base';
@Component({
    selector:'ngz-collapse-item',
    template:`        
        <ng-content select="[ngz-collapse-btn]"></ng-content>
  
            <div [@Collapse]="state" *ngIf="isOpen" class="w-100" style="overflow:hidden">
                <div class="px-1">
                    <ng-content></ng-content>
                </div>
            </div>

    `,
    animations:[collapse()]
})
export class CollapseItemComponent{
    isOpen:boolean;
    index:number;
    state:string='show';
    @Input('open')set _open(val:boolean){
        if(val){
            const preState=this.state;
            this.state=null;
            this.isOpen=true;
            setTimeout(()=>{
                this.state=this.state||preState;
            },1)
        }
    };
    openParent=(index:number)=>{};
    clearMark=()=>{};
    open(){
        this.isOpen=true;
        this.openParent(this.index);
    }
    close=()=>{
        this.isOpen=false;
        this.clearMark();
    }
    toggle=()=>this.isOpen?this.close():this.open();

}