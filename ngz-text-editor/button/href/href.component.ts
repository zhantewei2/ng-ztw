import { Component,ViewChild,HostBinding,HostListener} from '@angular/core';
import  {parent} from '../../total.service';
@Component({
  selector: 'ztw-href',
  templateUrl: './href.component.html',
  host:{
    class:'btn btn-l',
    '(mousedown)':'$event.preventDefault()',
    '(click)':'hostClick()'
  }
})
export class HrefComponent{
  @ViewChild('tp')tp:any;
  originText='http://';
  hrefText:string;
  inputNode:any;
  preRange:any;
  inputDisabled:boolean=true;

  focus(){
    if(!this.preRange)return;
    let sel=window.getSelection();
    sel.removeAllRanges();
    sel.addRange(this.preRange);
    this.preRange=null;
  }
  hostClick(){
    this.hrefText=null;
    let next:boolean;
    this.parent.modal.getResult(this.tp,'Link',true).then((range:any)=>{
      next=!!range;
      if(!range)return;
      if(!range||(range.startContainer==range.endContainer&&range.startOffset==range.endOffset)){
        this.hrefText=null;
        this.inputDisabled=true;
      }else{
        this.inputDisabled=false;
        this.hrefText=this.originText;
      }
    });
    setTimeout(()=>{
      if(!next)return;
      let node:any=this.inputNode=document.getElementById('ztw-text-editor-href-input');
      if(!node)return;
      node.focus();
      this.hrefText&&node.setSelectionRange(0,this.hrefText.length);
    });
  }
  constructor(
    private parent:parent
  ) {}
  test:string='true';
  confirm(){
    this.parent.modal.close();
    document.execCommand('createLink',false,this.hrefText);
  }
  cancel(){
    this.hrefText=this.originText;
    this.parent.modal.close();
  }
}
