import{Component,Directive,ElementRef,TemplateRef,Input,
    Injector,ViewContainerRef,ComponentFactoryResolver,
    ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';

import {PositionService} from '../../tool/pos.service';
import {ToolService} from '../../tool/tool.service';
import {Resize} from '../../service/resize.service';
import {menu} from '../../animate/base';
@Component({
    template:`
        <div [style.transform-origin]="origin" class="menu-content-{{_place}}" [@Menu]="state" (@Menu.done)="done()">
            <ng-content></ng-content>
        </div>
    `,
    host:{
        'class':'abs menu'
    },
    animations:[menu()],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class MenuComponent{
    state:any='hid';
    constructor(
        private _cd:ChangeDetectorRef,
        el:ElementRef,
        public pos:PositionService
    ){}
    origin:string;
    _place:string;
    set placement(val:string){
        this._place=val;
        this.origin=this.pos._origin(val);
    }
    cb0:Function;
    open=(cb:Function)=>{
        this.state='show';
        this._cd.markForCheck();
        this.cb0=cb;
    }
    cb:Function;
    close=(cb:Function)=>{
        this.state='hid';
        this._cd.markForCheck();
        this.cb=cb;
    };
    done=()=>this.state=='hid'?this.cb&&this.cb():this.cb0&&this.cb0();
}


@Directive({
    selector:'[ngz-menu]',
    host:{
        '(click)':'click()'
    },
    exportAs:'ngz-menu'
})
export class MenuDirective{
    @Input()placement:string='bottom';
    @Input()disCache:boolean;
    @Input()disDocument:boolean;
    @Input('ngz-menu')tp:TemplateRef<any>;
    storeEl:any;
    body:any;
    isOpen:boolean;
    comRef:any;
    prevent:boolean;
    resOrder:any;
    constructor(
        private _vcr:ViewContainerRef,
        private _cfr:ComponentFactoryResolver,
        private _injector:Injector,
        private _el:ElementRef,
        public pos:PositionService,
        public tool:ToolService,
        public _res:Resize
    ){
        this.body=document.querySelector('body');
        this.resOrder=this._res.valSub.subscribe(()=>{
            this.storeEl=null;
            this.close(true);
        });
    }
    close(force?:boolean){
        if(!force&&this.prevent||!this.isOpen)return;
        this.prevent=true;
        this.comRef.instance.close(()=>{
            if(this.disCache||force){

                this.comRef.destroy();
                this.storeEl=null;
            }else{
                this.storeEl&&this.body.removeChild(this.storeEl);
            }
            this.isOpen=false;
            this.prevent=false;
        })
    }
    setPos(){
        const pos:any=this.pos.tooltipPos(this._el.nativeElement,this.storeEl,this.placement,false,1);
        for(let i in pos.pos){
            this.storeEl.style[i]=pos.pos[i];
        }
    }
    viewRef:any;
    open(){
        console.log(this.tp);
        if(this.prevent||!(this.tp instanceof TemplateRef))return;
        this.prevent=true;
        if(!this.storeEl){
            this.viewRef&&this._vcr.remove(this._vcr.indexOf(this.viewRef));
            this.viewRef=this._vcr.createEmbeddedView(this.tp);
            this.comRef=this._vcr.createComponent(this._cfr.resolveComponentFactory(MenuComponent),0,this._injector,[this.viewRef.rootNodes]);
            this.storeEl=this.comRef.location.nativeElement;
            this.comRef.instance.placement=this.placement;

            this.setPos();
        }
        this.body.appendChild(this.storeEl);
        this.comRef.instance.open(()=>{
            this.isOpen=true;
            !this.disDocument&&setTimeout(()=>this.tool.listenOnce(document,'click',()=>this.close()));
            this.prevent=false
        });
    }
    toggle(){
        this.isOpen?this.close():this.open();
    }
    click(){
        this.isOpen?this.disDocument&&this.close():this.open();
    }

    ngOnDestroy(){
        this.comRef&&this.comRef.destroy();
        this.resOrder.unsubscribe();
    }
}