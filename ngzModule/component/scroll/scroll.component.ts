import {Component,Input,ContentChildren,forwardRef,Output,EventEmitter} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import {ScrollBindDirective} from './scrollBind.directive';
import {ScrollService} from '../../service/scroll.service'
import {Parent} from './parent';
export interface OffsetControl{
  top:number;
  bottom:number;
  value:any;
  over?:any;
}
export interface ScrollOpts{
  value?:string|number;
  duration?:number;
  vt?:number;
  notBottom?:boolean;
}
export interface ScrollOpts2{
  value:number;
  notBottom?:boolean;
  duration?:number;
  vt?:number;
  top?:number;
  end?:number;
  timing?:'out'|'in'|null;
}

@Component({
	selector:'ngz-scroll',
  template:` <ng-content></ng-content>` ,
  providers:[
  { provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(()=>ScrollComponent),
    multi:true},
  {provide:Parent,useExisting:forwardRef(()=>ScrollComponent)}]
})
export class ScrollComponent{
  constructor(
      public _scroll:ScrollService){}
  @ContentChildren(ScrollBindDirective)controls:any;
  @Input()baseLine:any=0;
  @Input()throttleTime:number=0;
  @Output('event')event:EventEmitter<any>=new EventEmitter();
  @Input()justScroll:boolean;
  @Input()forbidAnimate:boolean;
  scrollOb:Observable<any>=Observable.fromEvent(window,'scroll');
  resizeOb:Observable<any>=Observable.fromEvent(window,'resize');
  offsetControls:Array<OffsetControl>=[];
  scrollSub:any;
  resizeSub:any;
  storeMsn:any;
  scrollTop:number;
  pause:boolean;
  bound:number;
  emit:any=()=>{};
  changeEmit:any=(msn:any)=>{
   if(this.storeMsn!==msn){
     this.emit(msn);
     this.storeMsn=msn;
   }
 };
  subScroll(){
    if(this.scrollSub||this.resizeSub)return;
    this.scrollSub=this._scroll.scrollEvent.throttleTime(this.throttleTime).subscribe((pos:any)=>!this.pause&&this.checkOnce(pos))
    this.resizeSub=this.resizeOb.debounceTime(300).subscribe(()=>this.calControls());
  }
 ngAfterViewInit(){
   if(this.justScroll)return;
   //such as inner tab;you need delay calControls;
   setTimeout(()=>{
     this.calControls();
     this.controls.changes.subscribe(()=>this.calControls());
     this.subScroll();
   });
 };
  getScrollPos(){
    let top=this.scrollTop=this._scroll.getScrollTop();
    return {top:top,bottom:top+window.innerHeight};
  }
  checkOnce(pos:any){
    let i=this.offsetControls.length,control:any;
    this.event.emit(pos);
    while(i--) {
      control=this.offsetControls[i];
      this.bound=control.over === 'bottom' ?pos.bottom:pos.top;
      if (this.bound >= control.top && this.bound <= control.bottom) {
        this.changeEmit(control.value);
        return;
      }
    }
    this.changeEmit(undefined);
  }

 calControls(refresh?:boolean){
  let _newOffC:any=[];
  this.controls.map((control:any)=>{
    let node=control.el.nativeElement,
    offsetControl:any={};
    let top=(control.remainTop!==undefined&&!refresh)?control.remainTop:this._scroll.pos.getPos(node).top-this.baseLine-control.baseLine,
    controlAttr:any={
      top:top,
      bottom:top+node.offsetHeight,
      value:control.value,
      over:control.over
    };
    let existsControl=this.offsetControls.find(v=>v.value==control.value);
    if(existsControl){
      Object.assign(existsControl,controlAttr);
      _newOffC.push(existsControl);
    }else{
      _newOffC.push(controlAttr);
    }
    this.offsetControls=_newOffC;
  });
};
getControlOffset=(value:any)=>this.offsetControls.find((v:any)=>v.value==value);

scrollToNode=(node:any,opts:ScrollOpts2|any={})=>{
  opts.value=this._scroll.pos.getPos(node).top-this.baseLine;
  return this.scrollTo2(opts);
}
scrollTo(opts:ScrollOpts){
  this.storeMsn=null;
  let top:number=this._scroll.getScrollTop(),
      end:number=this._scroll.getScrollEnd();
  opts=Object.assign(opts,{top:top,end:end});
  if(opts.value=='ngz_top'){
    return top<=0?Promise.resolve():(opts.value=0)||this.scrollTo2(opts);
  };
  if(opts.value=='ngz_bottom'){
    return top>=end?Promise.resolve():(opts.value=-1)&&this.scrollTo2(opts);
  }
  let offset=this.getControlOffset(opts.value);
  if(!offset)return Promise.resolve(false);
  opts.value=this.getControlOffset(opts.value).top+10;
  return this.scrollTo2(opts);
};
scrollTo2(opts:ScrollOpts2|any){
  this.pause=true;
  return new Promise(resolve=>{
    let top=opts.top===undefined?this._scroll.getScrollTop():opts.top,
        end=opts.end||this._scroll.getScrollEnd(),
        pos=opts.value;
    if(pos>end||pos==-1)pos=opts.notBottom?end-20:end;
    if(pos<0)pos=0;
    if(this.forbidAnimate){
      this.pause=false;
      return resolve(!!window.scrollTo(0,pos));
    }
    this._scroll.pos.moveAnimate(
        {x0:top,x1:pos,timing:opts.timing,t:opts.duration,vt:opts.vt},
        (n:number)=>{window.scrollTo(0,top+n)},
        ()=>resolve(this.pause=false)
    )
  })
}
destroy(){
  if(this.scrollSub)this.scrollSub.unsubscribe();
  if(this.resizeSub)this.resizeSub.unsubscribe();
  this.scrollSub=null;
  this.resizeSub=null;
}

registerOnTouched(){};
registerOnChange(fn:any){
  this.emit=fn;
};
writeValue(value:any){
  if(this.pause)return;
  value!==undefined&&this.offsetControls.length&&this.scrollTo({value:value});
};
ngOnDestroy(){
  this.destroy();
}
}
