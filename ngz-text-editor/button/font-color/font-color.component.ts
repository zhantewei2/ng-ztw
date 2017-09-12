import { Component,HostBinding,ViewChild} from '@angular/core';
import {parent} from '../../total.service';

@Component({
  selector: 'ztw-font-color',
  templateUrl: './font-color.component.html',
  host:{
    'class':'db-btn'
  }
})
export class FontColorComponent {
  color:string='black';
  @ViewChild('colorPallete')colorPallete:any;
  colorAn:string='normal';
  constructor(
    private parent:parent
  ) {}
  selectColor(colorTp:any){
    this.parent.modal.getResult(colorTp,'Color',true).then(()=>{
      const node=document.getElementById('ztw-textEdit-color');
      node&&node.appendChild(this.createContainer())
    });
  }
  setColor=()=>document.execCommand('foreColor',true,this.color);
  click(e:any){
    let node=e.target;
    if(node.nodeName=='SPAN'){
      this.color=node.style.background;
      this.parent.modal.close();
      this.setColor();
    }
  }
  cacheFragment:any;
  createContainer(){
    let size=3,rowC=7,total=0,per=255/(size-1),node,container;
    if(this.cacheFragment){
      container=this.cacheFragment;
    }else {
      const fragment=document.createDocumentFragment();
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          for (let z = 0; z < size; z++) {
            node = document.createElement('span');
            node.style.background=`rgb(${Math.ceil(per * x)},${Math.ceil(per * y)},${Math.ceil(per * z)})`;
            node.className='colorBlock';
            fragment.appendChild(node);
            total++;
            if (total != 1 && total % rowC == 0) fragment.appendChild(document.createElement('br'));
          }
        }
      }
      container=document.createElement('div');
      container.appendChild(fragment);
      this.cacheFragment=container;
    }
    return container;
  }
}
