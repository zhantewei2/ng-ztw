import {Component,ViewChild,ElementRef} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
        <div #arrowEl class="{{arrow}}"></div>
        <ng-content></ng-content> 
  `,
  host:{
    'class':'abs show'
  }
})
export class TooltipComponent{
  node:any;
  pure:boolean;
  arrow:string;
  arrowStyle:any;
  @ViewChild('arrowEl')arrowEl:any;
  set Arrow(val:any){
    let place=val.placement,dis=val.dis,attr:string;
    if(this.pure)return;
    this.arrow='arrow-'+place;
    if(dis>0){
      this.arrowEl.nativeElement.style.marginLeft=val.dis+'px';
    }
  };
  constructor(
    private _el:ElementRef
  ){
    this.node=_el.nativeElement;
    this.node.id='id1';
  }
}
