import {Directive,Input,ViewContainerRef,TemplateRef} from '@angular/core';
@Directive({
    selector:'[innerTp]'
})
export class innerTp{
    constructor(
      private _vcr:ViewContainerRef
    ){}
    preExist:boolean;
    @Input()deps:any;
    @Input()set innerTp(val:TemplateRef<any>){
        if(!val)return;
        if(this.preExist)this._vcr.clear();
        const viewRef=this._vcr.createEmbeddedView(val);
        this.preExist=true;
        if(this.deps)viewRef.context.$implicit=this.deps;
    }

}