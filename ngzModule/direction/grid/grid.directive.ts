import {Directive,TemplateRef,ViewContainerRef,Input} from '@angular/core';
import {Resize} from '../../service/resize.service';
@Directive({
    selector:'[ngz-col-show]',
    host:{
        '(click)':'click()'
    }
})
export class GridDirective{
    deny:boolean;
    size:'sm'|'md'|'lg';
    @Input('ngz-col-show')set colStg(val:any){
        if(!val)return;
        if(val[0]=='!'){
            this.deny=true;
            this.size=val.slice(1);
        }else{
            this.deny=false;
            this.size=val;
        }
    };
    node:any;
    resSub:any;
    viewRef:any;
    ngOnInit(){
        this.setCol(this.resize.value);
    }
    setCol(val:string){
        if(this.deny){
            val!=this.size?this.add():this.remove();
        }else{
            val==this.size?this.add():this.remove();
        }
    };
    remove=()=>{
        this._vcr.clear();
        this.viewRef=null;
    };
    add=():any=>!this.viewRef&&(this.viewRef=this._vcr.createEmbeddedView(this._tp));
    constructor(
        private _tp:TemplateRef<any>,
        private _vcr:ViewContainerRef,
        public resize:Resize
    ){
        let preval:any;
        this.resSub=resize.valSub.subscribe((val:any)=>{
            if(val!=preval){
                this.setCol(val);
                preval=val;
            }
        });
    }
    ngOnDestroy(){
        this.resSub.unsubscribe();
    }
}