import { Directive,Output,EventEmitter,Input} from '@angular/core';

@Directive({
  selector: '[ngz-clickCopy]',
  host:{
    '(click)':'copy()'
  }
})
export class ClickCopyDirective {
  @Input('ngz-clickCopy')copyData:any;
  @Output()copyComplete:EventEmitter<any>=new EventEmitter();
  copy(){
    const body=document.body;
    const hid=this.getHidNode();
    body.appendChild(hid);
    const r=document.createRange();
    r.selectNode(hid);
    const w=window.getSelection();
    w.removeAllRanges();
    w.addRange(r);
    document.execCommand('copy');
    this.copyComplete.emit();
    body.removeChild(hid);
  }
  getHidNode(){
    const hid=document.createElement('p');
    hid.className='hidNode';
    hid.innerText=this.copyData;
    return hid;
  }
}
