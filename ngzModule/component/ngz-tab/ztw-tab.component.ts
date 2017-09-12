import {
  Input, Injectable, ViewChild, EventEmitter,ComponentRef, ElementRef, ContentChildren, Component, Output, Directive,
  ViewContainerRef,
  ComponentFactoryResolver,
  TemplateRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {carousel,fade} from '../../animate/base';
import {ToolService} from '../../tool/tool.service';
/*
how to use:
  <ngz-tab>

    <ngz-tabContent>content1</ngz-tabContent>
    <button ngz-tabBtn>btn1</button>

  </ngz-tab>
 */
//ztwTabContent:


@Directive({
  selector:'[ngz-tabContent]'
})
export class ngzTabContent{
  state:string;
  constructor(public tp:TemplateRef<any>
  ){}
}
//ngz-tabBtn:
@Directive({
  selector:'[ngz-tabBtn]',
  host:{
    '(click)':'click()',
    'class':'tab-btn'
  }
})
export class ngzTabBtn{
  node:any;
  //active:boolean;
  constructor(public _el:ElementRef){this.node=_el.nativeElement}
  click(){}
}

//ngz-tab:
@Component({
  selector: 'ngz-tab',
  template: `      
    <div [ngClass]="!disabledDefault?'tab-group-'+type+' tab-group':''">
      <div [class.bottomLine]="!noNavLine">
        <div class="tab-btn-group rel" [ngClass]="appendNav">
            <ng-content select="[ngz-tabBtn]"></ng-content>
        </div>
      </div>
      <div class="rel tab-container" [ngClass]="appendBlock">
          <ng-template [ngForOf]="contentControls" ngFor  let-i let-index="index">
              <div [@Carousel]="i.state" *ngIf="index==selectItem;">
                    <a [innerTp]="i.tp"></a>
              </div>
          </ng-template>
       <div>
    </div>
      `,
  changeDetection:ChangeDetectionStrategy.OnPush,
  animations:[carousel(),fade()]
})
export class ngzTabComponent {
  constructor(
      private _cfr:ComponentFactoryResolver,
      public tool:ToolService,
      private _cd:ChangeDetectorRef
  ){}
  @Input()disabledDefault:boolean;
  @Input()noNavLine:boolean;
  @Input()appendBlock:string;
  @Input()appendNav:string;
  @Output('select')select:EventEmitter<number>=new EventEmitter();
  @ViewChild('bar')bar:any;
  @Input('defaultIndex')set default(val:number){
    if(val!==undefined)this.selectItem=val;
  }
  @Input()type:string='l';
  @ContentChildren(ngzTabContent)contents:any;
  @ContentChildren(ngzTabBtn)btns:any;
  ngAfterContentInit(){
    this.initBtn();
    this.initContent();
    this.contents.changes.subscribe(()=>this.initContent());
    this.btns.changes.subscribe(()=>this.initBtn());
  }
  selectItem:number=0;
  //select primary content:
  contentControls:Array<ngzTabContent>;
  btnControls:Array<ngzTabBtn>;

  len:number;
  barLeft:number;
  barWidth:number;
  stripBar:any;

  initBar(){
    this.stripBar=document.createElement('div');
    this.stripBar.className='strip-bar';
    this.btnControls[0].node.appendChild(this.stripBar);
    if(this.selectItem!==0)this.setBar(this.selectItem);
  }
  setBar(index:number){
    this.stripBar.style.transform=`translateX(${index*100}%)`
  }


  open(index:number){
    if (index==this.selectItem)return;
    const now=this.contentControls[index],
        pre=this.contentControls[this.selectItem];
    if(index>this.selectItem){
      now.state='right';
      pre.state='left';
    }else{
      now.state='left';
      pre.state='right';
    }
    //this.btnControls[index].active=true;
    //this.btnControls[this.selectItem].active=false;
    !this.disabledDefault&&this.setBar(index);
    this._cd.markForCheck();
    setTimeout(()=>{
      this.selectItem=index;
      this.select.emit(index);
      this._cd.markForCheck();
    });
  }
  initContent(){
    this.contentControls=this.contents._results;
    this.len=this.contentControls.length;
  }
  initBtn(){
    this.btnControls=this.btns._results;
    !this.disabledDefault&&this.initBar();
    //this.btnControls[this.selectItem].active=true;
    this.btnControls.forEach((control:ngzTabBtn,index:number)=>this.btnControls[index].click=()=>this.open(index));
  }
}



