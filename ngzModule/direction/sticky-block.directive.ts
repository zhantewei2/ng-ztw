import {Directive,Input,ElementRef,Output,EventEmitter} from '@angular/core';
import {Resize} from '../service/resize.service';
import {ScrollService} from '../service/scroll.service';
import {ToolService} from '../tool/tool.service';
@Directive({
    selector:'[ngz-sticky]',
    host:{
        'class':'sticky'
    },
    exportAs:'ngz-sticky'
})
export class StickyBlockDirective{
    @Input('ngz-sticky')set sticky(val:any){
        if(val===undefined)return;
        if(val=='destroy'){
          this.destroy();
        }else{
        this.self=this.el.nativeElement;
        this.parent=this.self.parentElement;

        if(!this.parent)return;
        const style=window.getComputedStyle(this.self,null);
        if(!this.useJs&&style.position.match(/sticky/)){
            this.state.emit('css');
            this.self.style.top=val+'px';
        }else{
            this.top=val;
            this._scroll.pos.posToRel(this.parent);
            this.state.emit('js');
            this.setSticky();
        }}
    }
    top:number;
    @Input()useJs:boolean;
    @Output()state:EventEmitter<any>=new EventEmitter();
    @Input()detectHeight:boolean;
    @Input()fixed:boolean;
    constructor(
        public res:Resize,
        public _scroll:ScrollService,
        private el:ElementRef,
        public tool:ToolService
    ){}
    self:any;
    selfPos:any;
    parent:any;
    parentPos:any;
    stickyTop:number;
    stickyBottom:number;
    relCal=()=>setTimeout(()=>this.calParent());
    calSelf(){
        this.selfPos=this._scroll.pos.getPos(this.self);
        this.stickyTop=this.selfPos.top-this.top;
    }
    calParent(){
        this.parentPos=this._scroll.pos.getPos(this.parent);
        if(this.selfPos)this.stickyBottom=this.parentPos.top+this.parent.clientHeight-this.selfPos.h-this.top;
    }
    cal(){
        this.calSelf();
        this.calParent();
    }
    clearSelf(){
        if(!this.self)return;
        this.self.style.position=null;
        this.self.style.top=null;
    }
    setSticky(){
        const self=this.self;
        setTimeout(()=>{
            this.cal();
            const handleSticky=(top:any)=>{
                if(top>this.stickyBottom&&!this.fixed){
                    self.style.position='absolute';
                    self.style.bottom=0;
                    self.style.top=null;
                }
                else if(top>this.stickyTop){
                    self.style.position='fixed';
                    self.style.bottom=null;
                    self.style.top=this.top+'px';
                }else{
                    this.clearSelf();
                }
            };
            handleSticky(this._scroll.getPos());
            this.destroy();
            this.scrollSub=this._scroll.scrollEvent.subscribe((v:any)=>handleSticky(v.top));
            if(this.detectHeight)this.detectSub=this._scroll.detectBodyHeight.subscribe(()=>this.calParent());
        },1)
    }
    scrollSub:any;
    detectSub:any;
    ngOnInit(){


    }
    destroy(){
        this.clearSelf();
        this.scrollSub&&this.scrollSub.unsubscribe();
        this.detectSub&&this.detectSub.unsubscribe();
    }
    ngOnDestroy(){
        this.destroy();
    }
}