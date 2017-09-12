import { Component, OnInit,Input,ViewChild} from '@angular/core';
import {ToolService} from '@ng-ztw';
import {parent} from '../../total.service';
import {Subject} from 'rxjs/Subject';

interface ImgConfig{
  prefix:string;
  result:any;
  disUpload:boolean;
  initList?:any;
  limitSize:number;
  limitCount:number;
  getImgs:any;
}

/*
  <ztw-text-editor #myText></ztw-text-editor>
  @ViewChild('myText')myText
  let config=myText.config.upImg;
  config.result.subscribe(v=>{
    v:{
      type:'remove'|'add',
      val:,
      next:callBack
    }
  })
  config.limitSize=
  config.limitCount=
  1. get Imgs:const allUploadImgs=config.getImgs();
  2. set Imgs:config.initList=[]:Array<imgUrl>;
  3. disabled uploadImg: config.disUpload=true;
 */

@Component({
  selector: 'ztw-image',
  templateUrl: './image.component.html',
  host:{
    'class':'btn btn-l',
    '(click)':'hostClick()',
    '(mousedown)':'$event.preventDefault()'
  }
})
export class ImageComponent implements OnInit {
  //@HostBinding('class')hostClass='btn0 btn-icon';
  @ViewChild('tp')tp:any;
 // @ViewChild('tp2')tp2:any;
  @Input()disUpload:boolean;
  constructor(
    public parent:parent,
    public tool:ToolService
  ) { }
  inputHref:string;
  width:number;
  fr:any=new FileReader();
  fr2:any=new FileReader();
  btnC:string='btn borderR rgBtn btn0-inverse';
  hostClick(){
    this.parent.modal.getResult(this.tp,null,true).then((result:any)=>this.preRange=result);
  }
  loading:boolean=false;
  buffer:any;
  imgData:any;
  tempImg:any;
  imgList:any=[];
  imgItem:number;
  parentNode:any;
  preRange:any;
  exists:any;
  showList:boolean;
  config:any;
  isEdit:boolean;
  ngOnInit() {
    this.fr.onload=(e:any)=>{
      this.buffer=e.target.result;
    };
    this.fr2.onload=(e:any)=>{
      this.imgData=e.target.result;
    };
    this.config=this.parent.config.upImg={
      result:new Subject(),
      getImgs:()=>this.imgList?this.imgList.map((v:any)=>v.pre):null,
      limitCount:5
    };
    Object.defineProperty(this.config,'initList',{
      set:(val)=>{
        this.imgList=val.map((v:any)=>this.filterPath(v));
        this.imgItem=0;
        this.showList=!!this.imgList.length;
      }
    })
  }
  filterPath=(path:any)=>{
    const prefix=this.config.prefix;
    return {pre:path,show:prefix?prefix+path:path};
  };
  ngAfterViewInit(){
    this.parentNode=this.parent.textarea.nativeElement.parentNode;
    this.width=this.parentNode.offsetWidth/2;
  }
  _event(fn:Function,config:any){
    this.loading=true;
    let next=(opts:any)=>{
      this.loading=false;
      fn(opts);
    };
    config.next=next.bind(this);
    this.config.result.next(config);
  }
  upload(){
    this._event((url:string)=>{
      this.imgData=null;
      if(url){
        this.showList=true;
        this.imgList.push(this.filterPath(url));
        this.imgItem=this.imgList.length-1;
      }
    },{
      type:'add',
      val:this.buffer
    });
  }
  removeImg(i:any,url:string){
    this._event((bool:boolean)=>{
      if(!bool)return;
      this.imgList.splice(i,1);
      const len=this.imgList.length;
      if(!len)this.showList=false;
      let newItem=i;
      if(newItem>=len)newItem=i-1;
      this.imgItem=newItem;
    },{
      type:'remove',
      val:url
    });
  }
  overImg:boolean;
  fileChange(e:any){
    this.overImg=false;
    let node =e.target;
    let oFile=node.files[0],size=this.config.limitSize;
    if(!oFile)return;
    if(size&&oFile.size>size)return this.overImg=true;
    this.fr.readAsArrayBuffer(oFile);
    this.fr2.readAsDataURL(oFile);
  }
  addImg(){

  }
  reEl:any;
  delEl:any;
  clearRe(){
    let parent=this.reEl.parentNode;
    parent.removeChild(this.reEl);
    parent.removeChild(this.delEl);
    parent.className='';
    this.reEl=null;
    this.delEl=null;
  }
  addPicture(address:string){
    this.parent.modal.close();
    if(!this.preRange)return;
    let
      img=document.createElement('img'),
      a=document.createElement('a');
    a.appendChild(img);
    a.contentEditable='false';
    img.src=address;
    img.addEventListener('click',(e)=>{
      e.stopPropagation();
      if(this.reEl)return this.clearRe();
      a.className='te-resize-img inline-d ';
      const resNode=this.reEl=document.createElement('button');
      const delNode=this.delEl=document.createElement('button');
      delNode.className='fa fa-trash btn0 btn-sm btn-o-w abs-tl-0';
      resNode.className='fa fa-arrows-alt abs-br-0 btn0 btn-sm btn-o-w';
      let y:number,y0:number;
      //res Method:
      this.tool.moveEvent(resNode,
        (e:any)=>y0=img.offsetHeight-e.y,
        (e:any)=>img.style.height=y0+e.y+'px'
      );
      //del Method:
      delNode.addEventListener('click',()=>{
        a.parentNode.removeChild(a);
        this.reEl=null;
        this.delEl=null;
      });
      a.appendChild(resNode);
      a.appendChild(delNode);
      this.tool.listenOnce(document,'click',()=>this.reEl&&this.clearRe())
    });
    this.preRange.insertNode(a);
    this.parent.resetFocus(a);
    this.inputHref=null;
  }
}
