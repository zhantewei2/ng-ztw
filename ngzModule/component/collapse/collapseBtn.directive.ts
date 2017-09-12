import {Directive,ElementRef} from '@angular/core';
import {CollapseItemComponent} from './collapseItem.component';
import {CollapseComponent} from './collapse.component';
@Directive({
    selector:'[ngz-collapse-btn]',
    host:{
        class:'btn w-100',
        '(click)':'_parent.toggle()',
        '[class.active]':'_ancestor.preIndex===_parent.index'
    }
})
export class CollaspeBtnDirective{
    a:any;
    constructor(
        private _el:ElementRef,
        public _parent:CollapseItemComponent,
        public _ancestor:CollapseComponent
    ){
        this.addType(this._ancestor._type);
        this._ancestor.typeSub.subscribe((type:string)=>this.addType(type));
    }
    nowType:any;
    addType(type:any){
        if(type===this.nowType)return;
        const node=this._el.nativeElement;
        let reg=type!==null?/(btn-\w?|_clp-btn-\w?)/g:/(btn-\w?|_clp-btn-\w?|collapse-btn\s?)/g;
        node.className=node.className.replace(reg,'');
        if(type!==null){
            node.classList.add(`btn-${type}`,`_clp-btn-${type}`,'collapse-btn');
        }else{
            node.classList.add('collapse-null-btn');
        }
        this.nowType=type;
    }

}