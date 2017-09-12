import { Component, OnInit ,ViewChild,forwardRef,Input} from '@angular/core';
import {parent} from '../total.service';
import {tabKey} from '../shortcut-key/tab'
import {FilterHTML} from '../ts/filterHTML';
import {CheckHTML} from '../ts/manage';
export interface btn{
  name:string,
  fn:any
}
@Component({
  selector: 'ngz-text-editor',
  templateUrl: './text-editor.component.html',
  providers:[{provide:parent,useExisting:forwardRef(()=>TextEditorComponent)}],
  host:{
    'class':'block column'
  }
})
export class TextEditorComponent implements OnInit {
  constructor(

  ) { };
  @Input()limitSize:number=5000;
  @ViewChild('modal')modal:any;
  @ViewChild('textarea')textarea:any;
  @Input('disUpload')disUpload:boolean;
  config:any={

  };
  textNode:any;
  textNode2:any;
  exec:any=(data:any)=>{
    return ()=> {
      document.execCommand(data);
    }
  };
  findParent(node:any):any{
    if(node==this.textNode||node==this.textNode2)return true;
    if(node.nodeName=='BODY')return false;
    return this.findParent(node.parentNode);
  }
  buttonArr:Array<btn>=[
    {name:'undo',fn:this.exec('undo')},
    {name:'bold',fn:this.exec('bold')},
    {name:'italic',fn:this.exec('italic')},
    {name:'align-left',fn:this.exec('justifyLeft')},
    {name:'align-center',fn:this.exec('justifyCenter')},
    {name:'align-right',fn:this.exec('justifyRight')}
  ];
  ngOnInit() {
    const node=this.textNode=this.textarea.nativeElement;
    tabKey(node);
    this.managePaste(node);

  }
  resetFocus(node:any){
    setTimeout(()=>{
      let range=document.createRange(),sel=window.getSelection();
      range.setStartAfter(node);
      sel.removeAllRanges();
      sel.addRange(range);
    },1)
  }
  addStyle(node:any,style:any){
    for(let i in style){
      node.style[i]=style[i];
    }
  }
  reset(){
    this.textNode.innerHTML='';
  }
  getHTML=(limit1=this.limitSize)=>CheckHTML(this.textNode.innerHTML,this.limitSize,'文章',this);
  clearTxt1=()=>this.textNode.innerHTML='';
  getAll(title2='文章2'){
    return {
      txt:this.getHTML(),
      txt2:CheckHTML(this.textNode2.innerHTML,this.txt2.limitNum,title2,this)
    }
  }
  buttonFn:any={
    unlink:()=>{
      document.execCommand('unlink');
    }
  };

  managePaste(node:any){
    node.addEventListener('paste',(e:any)=>{
      e.preventDefault();
      let filterHTML=new FilterHTML(),
        html=e.clipboardData.getData('text/html'),
        result=filterHTML.filter(html);
      let div=document.createElement('div'),sel=window.getSelection();
      div.innerHTML=result;
      sel.getRangeAt(0).insertNode(div);
      this.resetFocus(div);
      //document.execCommand('insertHTML',false,result);
    })
  }
  txt2:any;
  cacheTxt2:any;
  txt2Begin=(title:string,limitNum:number)=>{this.txt2=null;this.txt2Open(title,limitNum)};
  txt2Open=(title:string,limitNum:number)=>{
    if(!this.txt2){
      this.txt2={
        title:title,
        limitNum:limitNum,
        content:null,
        isOpen:true
      };
      setTimeout(()=>{
        this.textNode2=document.getElementById('ztw_textEditor2');
        this.managePaste(this.textNode2);
        this.cacheTxt2&&(this.textNode2.innerHTML=this.cacheTxt2);
      },1)
    }else{
      this.txt2.isOpen=true;
    }
  };
  txt2Close=()=>{console.log('close');this.txt2.isOpen=false};
  txt2Remove=()=>{
    this.textNode2&&(this.cacheTxt2=this.textNode2.innerHTML);
    this.txt2=null;
  };
  closeBg2:boolean;
}
