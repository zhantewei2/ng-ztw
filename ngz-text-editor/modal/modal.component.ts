import { Component,ViewContainerRef,TemplateRef,ViewChild} from '@angular/core';
import {parent} from '../total.service';
import {Subject} from 'rxjs/Subject';
import {modal,fade} from '../animate/animate';

@Component({
  selector: 'ztw-text-editor-modal',
  templateUrl: './modal.component.html',
  animations:[
    modal(),fade()
  ],
  host:{
    'class':'',
    '(click)':'hostClick()'
  }
})
export class ModalComponent{
  show:string='hid';
  show2:string='hid';
  prevent:boolean;
  modalDone(){
    this.prevent=false;
    if(this.show2=='hid')this.show='hid';
  }
  constructor(
    public parent:parent
  ) { }
  containerTitle:string;
  hostClick(){
    this.close();
  }
  @ViewChild('container',{read:ViewContainerRef})container:any;
  sub:any;
  preRange:any;
  full:boolean;
  closeSubject:Subject<number>=new Subject();
  innerText:string;
  focus(){
    if(!this.preRange)return;
    let sel=window.getSelection();
    sel.removeAllRanges();
    sel.addRange(this.preRange);
    this.preRange=null;
  }
  appendComponent(data:any,title:string){
    this.container.clear();
    this.innerText=null;
    if(data instanceof TemplateRef){
      this.container.createEmbeddedView(data);
    }else{
      this.innerText=data;
    }
    this.containerTitle=title;
    this.open();
  }
  getResult(component:any,title:string,useFocus:boolean=false,full:boolean=false){
    return new Promise(resolve=>{
      if(this.show=='show'){
        this.close();
        return resolve(false);
      }
      this.full=full;
      this.appendComponent(component,title);
      if (useFocus) {
        let range;
        try {
          range = window.getSelection().getRangeAt(0);
        } catch (e) {}
        if (!range)return resolve(false);
        if (!this.parent.findParent(range.startContainer))return resolve(false);
        this.preRange = range;
        return resolve(range);
      }
      return resolve(false);
    });
  }
  open(){
    this.show='show';
    this.show2='show';
    this.prevent=true;
  }
  close(){
    if(this.prevent)return;
    if(this.sub){
      this.sub.unsubscribe();
      this.sub=null;
    }
    if(this.preRange)this.focus();
    this.show2='hid';
    this.closeSubject.next(1);
  }
}
