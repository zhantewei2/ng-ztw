import { Component, OnInit,HostBinding} from '@angular/core';
import {parent} from '../../total.service';
@Component({
  selector: 'ztw-font-size',
  templateUrl: './font-size.component.html',
  host:{
    'class':'db-btn'
  }
})
export class FontSizeComponent implements OnInit {
  size:number=3;
  fontSize:number=3;
  getSize(tp:any){
    this.parent.modal.getResult(tp,'Font',true);
  }
  setSize(){
    document.execCommand('fontSize',false,this.size=this.fontSize);
    this.parent.modal.close();
  }
  constructor(
    private parent:parent
  ) { }
  ngOnInit() {
  }

}

