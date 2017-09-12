import {Directive,Input,TemplateRef,ViewContainerRef} from '@angular/core';
@Directive({
    selector:'[ngzForIn]'
})
export class ngzForInDirective{
    preParams:any;
    @Input()set ngzForIn(params:any){
        if(params instanceof Object){
            if(params!=this.preParams)this._vcr.clear();
            this.preParams=params;
            for(let i in params){
                const viewRef=this._vcr.createEmbeddedView(this._tp);
                viewRef.context.$implicit=i;
                viewRef.context.value=params[i];
            }
        }
    }
    constructor(
        private _tp:TemplateRef<any>,
        private _vcr:ViewContainerRef
    ){}
}