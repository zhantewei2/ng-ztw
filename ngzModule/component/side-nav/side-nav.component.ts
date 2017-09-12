import { Component, OnInit ,Input } from '@angular/core';
import {fade,sideRight} from '../../animate/base';

@Component({
  selector: 'ngz-nav-side',
  template:`
<div [@SideRight] *ngIf="show" class="nav-side-c" [style.width.px]="width" (@SideRight.done)="sideDown()">
    <div (click)="close()" class="rel" [style.height.px]="paddingTop">
        <span class="close" >&times;</span>
    </div>
    <div >
        <ng-content></ng-content>
    </div>
</div>
<div class="fix-bg" [@Fade] *ngIf="show" (click)="close()">
</div>
  `,
  animations:[sideRight(),fade()]
})
export class SideNavComponent implements OnInit {
  show:boolean;
  prevent:boolean;
  @Input()paddingTop:number=10;
  @Input()width:number;
  @Input()tp:any;

  constructor() { }
  open(){
    if(this.show||this.prevent)return;
    this.prevent=true;
    this.show=true;
  }
  close(){
    if(!this.show||this.prevent)return;
    this.prevent=true;
    this.show=false;
  }
  toggle(){
    this.show?this.close():this.open();
  }
  ngOnInit() {
  }
  sideDown(){
    this.prevent=false;
  }

}
