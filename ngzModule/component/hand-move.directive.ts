import {Directive,Input,ElementRef,Output,EventEmitter} from '@angular/core';
import {GlobService} from '../service/glob.service';

@Directive({
    selector:'[ngz-handMove]',
    exportAs:'ngz-handMove'
})
export class HandMoveDirective{
    @Output('offset')offset:EventEmitter<any>=new EventEmitter();
    @Output('documentOffset')documentOffset:EventEmitter<any>=new EventEmitter();
    @Output('moveEnd')moveEnd:EventEmitter<any>=new EventEmitter();
    @Input()preventDefault:boolean;
    @Input()parent:any;
    self:any;
    parentPos:any={};
    selfPos:any={};
    calParent(){
        if(!this.parent)return;
        const pos=this.glob.pos.getPos(this.parent);
        return Object.assign(this.parentPos,{y0:pos.top,y1:pos.top+pos.h,x0:pos.left,x1:pos.left+pos.w,w:pos.w,h:pos.h});
    }
    calSelf(){
        return Object.assign(this.selfPos,this.glob.pos.getPos(this.self));
    }
    moveDestroy:any;
    resOrder:any;
    prevent:boolean;
    placeIn(x:number,y:number){
        this.self.style.left=x+'px';
        this.self.style.top=y+'px';
    }
    dragMove(){
        this.glob.pos.posToRel(this.parent);
        this.self.classList.add('moveNode');
        const posP=this.calParent();
        const posS=this.calSelf();
        let x,y,relX,relY;
        this.documentOffset.subscribe((e:any)=>{
            if(this.prevent)return;
            x=e.x;
            y=e.y;
            relX=posP.x1-posS.w;
            relY=posP.y1-posS.h;
            x=x<posP.x0?posP.x0:(x>relX?relX:x);
            y=y<posP.y0?posP.y0:(y>relY?relY:y);
            x=x-posP.x0;
            y=y-posP.y0;
            this.offset.emit({x:x,y:y});
            if(this.preventDefault)return;
            this.placeIn(x,y);
        });
        this.resOrder=this.glob.res.valSub.subscribe(()=>setTimeout(()=>this.calParent()));
    }
    moveTo(params:{x?:number,y?:number,px?:boolean},opts:any={}){
        return new  Promise((resolve:any)=>{
            let posP=this.parentPos,posS=this.selfPos,bx,by;
            let x=params.x,y=params.y;
            let x0=this.self.offsetLeft,y0=this.self.offsetTop;
            this.prevent=true;
            if(typeof x=='number'){
                x=params.px?x:posP.w*x-posS.w/2;
                bx=posP.w-posS.w;
                x=x<0?0:(x>bx?bx:x);
                this.glob.pos.moveAnimate(Object.assign({x0:x0,x1:x},opts),(num:number)=>this.self.style.left=x0+num+'px',()=>{
                    resolve();
                    this.prevent=false;
                });
            }
            if(typeof y=='number'){
                y=params.px?y:posP.h*y-posS.h/2;
                by=posP.h-posS.h;
                y=x<0?0:(y>by?by:y);
                this.glob.pos.moveAnimate(Object.assign({x0:y0,x1:y},opts),(num:number)=>this.self.style.top=y0+num+'px',()=>{
                    if(x===undefined){
                        resolve();
                        this.prevent=false
                    }
                })
            }
            if(typeof x!='number'&&typeof y!='number')this.prevent=false;
        })
    }

    constructor(
        private _el:ElementRef,
        public glob:GlobService
    ){
        this.moveDestroy=glob.tool.moveEvent(
            _el.nativeElement,
            (e:any)=>{
                this.documentOffset.emit(e);
            },
            (e:any)=>{
                this.documentOffset.emit(e);
            },
            ()=>this.moveEnd.emit()
        )
    }
    ngAfterViewInit(){
        this.self=this._el.nativeElement;
        this.parent=this.parent||this.self.parentElement;
        this.parent.classList.add('noSelect');
        setTimeout(()=>{
            this.dragMove();
        });
    }
    ngOnDestroy(){
        this.moveDestroy();
        this.resOrder&&this.resOrder.unsubscribe();
    }
}