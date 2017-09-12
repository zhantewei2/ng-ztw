import {Component,ContentChildren,Input} from '@angular/core';
import {CollapseItemComponent} from './collapseItem.component';
import {Subject} from 'rxjs/Subject';

@Component({
    selector:'ngz-collapse',
    template:`
        <div>
            <ng-content></ng-content>
        </div>
    `,
    host:{
        class:'btn-group-block'
    }
})
export class CollapseComponent{
    _type:string='l';
    typeSub:Subject<string>=new Subject();
    @Input()set type(val:string){
        if(val!==undefined){
            this._type=val;
            this.typeSub.next(val)
        }
    }
    @Input()noAnimate:boolean;
    @ContentChildren(CollapseItemComponent)_items:any;
    ngAfterViewInit(){
        this.initItem();
        this._items.changes.subscribe(()=>this.initItem());
    }
    preIndex:number=null;
    initItem(){
        const _items=this._items._results;
        _items.forEach((control:CollapseItemComponent,index:number)=>{
            if(this.noAnimate)control.state='stop';
            control.index=index;
            control.clearMark=()=>this.preIndex=null;
            control.openParent=(i:number)=>{
                if(this.preIndex!==null){
                    const preItem=_items.find((control:CollapseItemComponent)=>control.index==this.preIndex);
                    preItem.isOpen=false;
                }
                this.preIndex=i;
            }
        })
    }
}