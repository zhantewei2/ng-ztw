import {Directive,Input,ElementRef,Output,EventEmitter} from '@angular/core';
import {Resize} from '../service/resize.service';
import {ScrollService} from '../service/scroll.service';
import {ToolService} from '../tool/tool.service';
@Directive({
    selector:'[ngz-sticky]',
    host:{
        'class':'sticky'
    },
    exportAs:'sticky-block'
})
export class StickyBlockDirective{
    @Input()top:number=0;
    @Input()useJs:boolean;
    @Output()state:EventEmitter<any>=new EventEmitter();
    constructor(
        public res:Resize,
        public _scroll:ScrollService,
        private el:ElementRef,
        public tool:ToolService
    ){}
    self:any;
    parent:any;
    stickyTop:number;
    stickyBottom:number;
    cal(){
        const pos=this._scroll.pos.getPos(this.self);
        const parentPos=this._scroll.pos.getPos(this.parent);
        this.stickyTop=pos.top-this.top;
        this.stickyBottom=parentPos.top+this.parent.clientHeight-pos.h-this.top;
    }
    setSticky(){
        const self=this.self;
        setTimeout(()=>{
            this.cal();
            const setBlock=(v:any)=>{
                if(v.top>this.stickyBottom){
                    self.style.position='absolute';
                    self.style.bottom=0;
                    self.style.top=null;
                }
                else if(v.top>this.stickyTop){
                    self.style.position='fixed';
                    self.style.top=this.top+'px';
                }else{
                    self.style.position=null;
                    self.style.top=null;
                }
            }
            setBlock(this._scroll.getPos());
            this.destroy();
            this.scrollSub=this._scroll.scrollEvent.subscribe((v:any)=>setBlock(v))

        },1)
    }
    scrollSub:any;

    ngOnInit(){

        this.self=this.el.nativeElement;
        this.parent=this.self.parentElement;
        if(!this.parent)return;
        const style=window.getComputedStyle(this.self,null);
        if(!this.useJs&&style.position.match(/sticky/)){
            this.state.emit('css');
            return this.self.style.top=this.top+'px';
        }
        this._scroll.pos.posToRel(this.parent);
        this.state.emit('js');
        this.setSticky();
    }
    destroy(){
        this.scrollSub&&this.scrollSub.unsubscribe();
    }
    ngOnDestroy(){
        this.destroy();
    }
}