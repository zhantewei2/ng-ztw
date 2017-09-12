import { Directive,Input,ElementRef,ViewContainerRef,Injector,HostListener,ComponentFactoryResolver} from '@angular/core';
import {PositionService}from '../../tool/pos.service';
import {Resize} from '../../service/resize.service';
import {TooltipComponent} from './tooltip.component';
import {GlobService} from '../../service/glob.service';

@Directive({
  selector: '[ngz-tooltip]',
  exportAs:'ngzTooltip'
})
export class TooltipDirective {
  @Input()placement:'top'|'bottom'|'left'|'right'='top';
  @Input('ngz-tooltip')set tipValue(val:any){
    this.value=val;
    this.reset();
  };
  @Input()pure:boolean;
  @Input()preventDefault:boolean;
  @HostListener('mouseenter')mouseenter(){
    !this.preventDefault&&this.open();
  }
  @HostListener('mouseleave')mouseleave(){
    !this.preventDefault&&this.close();
  }
  @Input()showStyle:any=this.glob.tooltip.showStyle;
  @Input()hidStyle:any=this.glob.tooltip.hidStyle;
  value:any;
  node:any;
  anTool:any;
  onceValue:string;
  onceNum:number;
  onceShow(val:string){
    this.onceValue=val;
    this.onceNum=2;
    this.reset();
  }
  reset(){
    if(this.node) {
      this.close();
      this.node = null;
      this.open();
    }
  }
  open(){
    let nodes:any,body=document.body,val=this.value;
    if(this.onceNum){
      this.onceNum--;
      this.node=null;
      if(this.onceNum)val=this.onceValue;
    }
    if(this.node){
      body.appendChild(this.node);
      this.anTool.state='start';
    }else {
      if (typeof val == 'string') {
        const node = document.createElement('span');
        node.innerText = val;
        nodes = [node];
      } else {
        const viewRef = this._vcr.createEmbeddedView(val);
        nodes = viewRef.rootNodes;
      }
      const componentFactory = this._cfr.resolveComponentFactory(TooltipComponent);
      const componentRef = this._vcr.createComponent(componentFactory, 0, this.injector, [nodes]);
      const node=this.node = componentRef.location.nativeElement;
      this.anTool=new this.glob.tool.voidAnimate({
        node:node,
        start:this.hidStyle,
        end:this.showStyle
      });
      componentRef.instance.pure = this.pure;
      if(!this.pure)node.classList.add('tip');
      body.appendChild(node);
      this.anTool.state='start';
      const result:any=this._pos.tooltipPos(this._el.nativeElement,node,this.placement);
      for (let i in result.pos){
        node.style[i]=result.pos[i];
      }
      componentRef.instance.Arrow={placement:this.placement,dis:result.dis};
    }
  }
  close(){
    this.anTool.state='end';
  }
  resSub:any;
  constructor(
    private _el:ElementRef,
    private _cfr:ComponentFactoryResolver,
    private _vcr:ViewContainerRef,
    private injector:Injector,
    public _pos:PositionService,
    public _res:Resize,
    public glob:GlobService
  ){
    this.resSub=_res.valSub.subscribe(()=>this.node=null);
  }
  ngOnDestroy(){
      this.resSub.unsubscribe();
  }
}
