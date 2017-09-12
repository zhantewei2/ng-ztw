import {Component,ViewChild,Input,forwardRef,ElementRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
@Component({
    selector:'ngz-slider',
    template:`        
        <div #child (moveEnd)="moveEnd()" (offset)="moveThumb($event)" (click)="$event.stopPropagation()" #thumb="ngz-handMove" class="slider-thumb bg-{{type}}" ngz-handMove></div>
        <div [ngClass]="vertical?'slider-line-vertical':'slider-line'"></div>
    `,
    providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>SliderComponent),multi:true}],
    host:{
        '[class]':'vertical?"slider-vertical":"slider"',
        '(click)':'select($event)'
    }
})
export class SliderComponent{
    @Input()max:number=100;
    @Input()min:number=1;
    @Input()type:string='p';
    @Input('vertical')vertical:boolean;
    @ViewChild('container')container:any;
    @ViewChild('child')child:any;
    @ViewChild('thumb')thumb:any;
    emit:any;
    value:number;
    thumbPos:any;
    prevent:boolean;
    moveThumb(e:any){
        this.thumbPos=e;
    }
    setValue(pos:number,len:number){
        this.emit(this.value=pos>=len?this.max:Math.floor(pos/len*(this.max-this.min))+this.min);
    }
    getXLen=()=>this.thumb.parentPos.h-this.thumb.selfPos.h;
    getYLen=()=>this.thumb.parentPos.w-this.thumb.selfPos.w;
    moveEnd=()=>{
        if(!this.thumbPos)return;
        this.setValue(this.vertical?this.thumbPos.y:this.thumbPos.x,this.vertical?this.getXLen():this.getYLen());
    }
    convertToPos=(val:number)=>(val-1)/(this.max-this.min)*(this.vertical?this.getXLen():this.getYLen());

    select(e:any){
        if(this.prevent)return;
        this.prevent=true;
        let pos,len,limit,moveParams:any={px:true};
        if(this.vertical){
            len=this.getXLen();
            moveParams.y=pos=e.offsetY>=len?len:e.offsetY-this.thumb.selfPos.h/2;
        }else{
            len=this.getYLen();
            moveParams.x=pos=e.offsetX>=len?len:e.offsetX-this.thumb.selfPos.w/2;
        }
        this.thumb.moveTo(moveParams).then(()=>this.prevent=false);
        pos=pos<0?0:pos;
        this.setValue(pos,len);
    }
    navTo(val:number){
        const pos=this.convertToPos(val);
        this.prevent=true;
        this.thumb.moveTo(this.vertical?{y:pos,px:true}:{x:pos,px:true}).then(this.prevent=false);
    }
    constructor(private el:ElementRef){}
    registerOnTouched(){};
    registerOnChange(fn:any){
        this.emit=fn;
    };
    initPos(val:number){
        const container:any=this.el.nativeElement,child:any=this.child.nativeElement;
        if(typeof val=='number'){
            let pos:any=(val-1)/(this.max-this.min)*(this.vertical?container.offsetHeight-child.offsetHeight:container.offsetWidth-child.offsetWidth);
            pos=Math.round(pos)+'px';
            this.vertical?(child.style.top=pos):(child.style.left=pos);
        }
        setTimeout(()=>child.style.visibility='visible');
    }
    runCount:number=0;
    writeValue(value:number){
        this.runCount++;
        if(this.runCount==2){
            return this.initPos(value)
        }
        if(typeof value!='number'||value<this.min||value>this.max||value===this.value)return;
        this.navTo(this.value=value);
    }
}
