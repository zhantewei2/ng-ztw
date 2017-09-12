import {Component,Input,ElementRef,ContentChildren} from '@angular/core'
import {carousel,fade} from '../../animate/base';
import {ToolService} from  '../../tool/tool.service';
@Component({
    selector:'ngz-carousel-item',
    template:`
<div *ngIf="show" class="full rel" [@Carousel]="state">        
    <img draggable="false" class="full" [src]="src">
    <ng-content select=".carousel-item-header"></ng-content>
</div>
    `,
    animations:[carousel()]
})
export class CarouselItemComponent{
    show:boolean=false;
    index:number;
    @Input()src:string;
    state:any;
}
@Component({
    selector:'ngz-carousel',
    template:`
<div (mouseenter)="enter()" (mouseleave)="leave()" class="carousel noSelect" [style.height.px]="height" style="overflow: hidden">
    <div [@Fade] *ngIf="isEdit" [style.fontSize.px]="btnSize" class="abs-tl-0 h-100 center">
        <span class="carousel-btn btn-left" data-foo="<" (click)="next(-1)"></span>
    </div>
    <div ngz-handEvent (handLeft)="next(1)" (handRight)="next(-1)" class="full">
         <ng-content></ng-content>
    </div>
    <div [@Fade] *ngIf="isEdit" [style.fontSize.px]="btnSize" class="abs-tr-0 h-100 center">
        <span class="carousel-btn btn-right" data-foo=">" (click)="next(1)"></span>
    </div>
    <div class="carousel-nav">
        <span (click)="selectItem(index)" [class.active]="index==nowIndex" *ngFor="let i of items;index as index;" class="carousel-nav-item"></span>
    </div>
</div>`,
    animations:[fade()]
})
export class CarsouselComponent{
    @ContentChildren(CarouselItemComponent)itemList:any;
    @Input()cycle:boolean=true;
    @Input()height:number=300;
    @Input()btnSize:number;
    @Input('autoPlay')set _autoPlay(val:any){
        if(this.autoPlay=val)this.cycle=true;
    }
    @Input()interval:number=2000;
    autoPlay:'left'|'right'|null;
    constructor(public tool:ToolService,private _el:ElementRef){
        const node=_el.nativeElement;
    }
    test:Function;
    isEdit:boolean;
    nowIndex:number;
    maxIndex:number;
    leave(){
        this.isEdit=false;
        this.play();
    }
    enter(){
        this.isEdit=true;
        this.pause();
    }
    playInterval:any;
    play(){
        if(this.autoPlay)this.playInterval=setInterval(()=>this.next(this.autoPlay=='right'?1:-1),this.interval);
    }
    pause(){
        if(this.autoPlay&&this.playInterval){
            clearInterval(this.playInterval);
            this.playInterval=null;
        }
    }
    items:Array<CarouselItemComponent>=[];
    init(){
            this.nowIndex=0;
            this.maxIndex=this.itemList.length-1;
            const items=this.items=this.itemList._results;
            items[0].show=true;
            this.play();
    }
    ngAfterContentInit(){
        this.init();
        this.itemList.changes.subscribe(()=>{this.init()});
    }
    carousel(num:number,nextIndex:number){
        const nextItem=this.items[nextIndex],nowItem=this.items[this.nowIndex];
        if(num<0){
            nowItem.state='right';
            nextItem.state='left';

        }else{
            nowItem.state='left';
            nextItem.state='right';
        }
        setTimeout(()=>{nowItem.show=false; nextItem.show=true;});
        this.nowIndex=nextIndex;
    }
    selectItem(index:number){
        const now=this.nowIndex;
        if(index==now)return;
        this.carousel(index>now?1:-1,index);
    }

    next(num:number){
        let nextIndex=this.nowIndex+num;
        if(!this.cycle&&(nextIndex>this.maxIndex||nextIndex<0))return;
        nextIndex=nextIndex>this.maxIndex?0:(nextIndex<0?this.maxIndex:nextIndex);
        this.carousel(num,nextIndex);
    }
}