import { Component, Directive,Input,ViewChild,
  TemplateRef,ViewContainerRef,ComponentFactoryResolver,
  ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {sideRight} from '../../animate/base';
import {PositionService} from '../../tool/pos.service';


@Component({
  selector: 'ngz-nav-side',
  template:`
      <div [class.fadeOut]="sideState=='hid'" class="nav-side-bg an_show">
      </div>
      <div (@SideRight.done)="done()" [@SideRight]="sideState" (click)="$event.stopPropagation()" class="nav-side-c" [style.width.px]="width" >
          <div (click)="closeSelf()" class="rel" [style.height.px]="paddingTop">
              <span *ngIf="!disClose" class="close" >&times;</span>
          </div>
          <div>
              <a #container></a>
          </div>
      </div>
  `,
  animations:[sideRight()],
  changeDetection:ChangeDetectionStrategy.OnPush,
  host:{
    class:'nav-side-container',
    '(click)':'closeSelf()'
  }
})
export class SideNavComponent{
  constructor(private _cd:ChangeDetectorRef){}
  @ViewChild('container',{read:ViewContainerRef})container:ViewContainerRef;
  createTp(tp:TemplateRef<any>){
    this.container.clear();
    const viewRef=this.container.createEmbeddedView(tp);
    viewRef.context.$implicit=true;
    this._cd.markForCheck();
  }
  clear(){this.container.clear()}
  sideState:'show'|'hid';
  disClose:boolean;
  closeSelf(){}
  done(){
    this.sideState==='hid'?this.closeCb():this.openCb&&this.openCb();
  }
  closeCb:Function;
  openCb:Function;
  close(cb:Function){
    this.sideState='hid';
    this.closeCb=cb;
    this._cd.markForCheck();
  }
  open(cb:Function){
    this.sideState='show';
    this.openCb=cb;
    this._cd.markForCheck();
  }
  @Input()width:number;
  @Input()paddingTop:number;
}


@Directive({
  selector:'[ngz-navSide]',
  exportAs:'ngz-navSide'
})
export class navSideDirective{
  @Input('ngz-navSide')set sideTp(val:TemplateRef<any>){
    this.tp=val;
    val&&this.isOpen&&this.createTp();
  }
  @Input()width:number;
  @Input()forceFix:boolean;
  @Input()top:number;
  @Input()parentEl:any;
  @Input()zIndex:number;
  @Input()disClose:boolean;
  constructor(
      private _vcr:ViewContainerRef,
      private _cfr:ComponentFactoryResolver,
      public _pos:PositionService
  ){}
  tp:TemplateRef<any>;
  preTp:TemplateRef<any>;
  parent:any;
  tpEl:any;
  comRef:any;
  isOpen:boolean;
  prevent:boolean;
  createTp=()=>this.comRef&&this.comRef.instance.createTp(this.tp);
  open(){

    if(this.prevent||!this.tp||!(this.tp instanceof TemplateRef))return;
    this.prevent=true;
    if(this.tp!==this.preTp)this.createTp();
    this.preTp=this.tp;
    if(!this.tpEl){
      const body=document.querySelector('body');
      this.parent=this.parentEl||body;
      this._pos.posToRel(this.parent);
      this.comRef=this._vcr.createComponent(this._cfr.resolveComponentFactory(SideNavComponent));
      this.comRef.instance.createTp(this.tp);
      this.tpEl=this.comRef.location.nativeElement;
      this.tpEl.style.position=this.parent==body?'fixed':(this.forceFix?'fixed':'absolute');
      this.zIndex&&(this.tpEl.style.zIndex=this.zIndex);
      const inst=this.comRef.instance;
      inst.paddingTop=this.top;
      inst.width=this.width;
      inst.disClose=this.disClose;
      inst.closeSelf=this.close.bind(this);
    }
    this.parent.appendChild(this.tpEl);
    this.isOpen=true;
    this.comRef.instance.open(()=>this.prevent=false);
  }
  clear(){
    this.comRef&&this.comRef.destroy();
    this.tpEl=null;
  }
  close(){
    if(this.prevent||!this.isOpen)return;
    this.comRef.instance.close(()=>{
      this.parent.removeChild(this.tpEl);
      this.prevent=this.isOpen=false;
    })
  }
  toggle(){
    this.isOpen?this.close():this.open();
  }
  ngOnDestroy(){
    this.clear();
  }
}


