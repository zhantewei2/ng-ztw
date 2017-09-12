import {Component,Input} from '@angular/core';
export interface Tds{
    type:string,
    value:Array<string>
}

export interface Item{
    title:string,
    count?:number,
    head?:Array<string>,
    body:Array<[string]|Tds>,
    itd?:string
}

@Component({
    selector:'my-api',
    templateUrl:'./API.html',
    host:{
        'class':'mb-4 block'
    }
})
export class MyApiComponent{
    /*lib:
    [{
        title:string,
         head:[td,td]
         body:[[td,td],[td,td]]
     }]
    */

    @Input()set lib(val:Array<Item>){
        let html='<div class="mb-2">';
        val.forEach((item:Item)=>{
            html+=`<h5 class="my-2">${item.title}</h5><div class="auto card block mb-1"><table class="sm0 table table-stripe">`;
            if(item.head){
              let head='<thead></tr>';
              item.head.forEach((td:string)=>{
                  head+=`<th>${td}</th>`
              })
              head+='</tr></thead>';
              html+=head;
            }
            if(item.body){
                let body='<tbody>';
                item.body.forEach((tr:any)=>{
                       body+='<tr>';
                       let addonClass:string;
                       if(!this.isArr(tr)){
                           addonClass=` class="b-${tr.type}"`;
                           tr=tr.value;
                       }
                       const len=tr.length,count=item.count;
                       tr.forEach((td:string|any,index:number)=>{
                           let addon='';
                           if(count){
                               let cell=count-index;
                               if(index==len-1&&cell>1)
                               addon=`colspan='${cell}'`;
                           }
                           let tdTp:any='';
                           if(typeof td=='object'){
                               //{title:'',content:[]}
                               tdTp+=`<a class="b-w">${td.title}</a>`||'';
                               tdTp+='<div class="quote-w px-0">';
                               td.content.forEach((list:string|any)=>{
                                   let inner=list;
                                   if(typeof list=='object'){
                                       //{pre:'',value:''}
                                       inner=(list.pre?`<samp>${list.pre}</samp>`:'')+(list.value||'');
                                   }
                                   tdTp+=`<div class="ml-1">${inner}</div>`;
                               })
                               tdTp+='</div>';
                           }else{
                               tdTp=td;
                           }
                           const tdContent=addonClass?`<a ${addonClass}>${tdTp}</a>`:tdTp;
                           body+=index==0?`<th ${addon}>${td}</th>`:`<td ${addon}>${tdContent}</td>`;
                       })
                       body+='</tr>';
                });
                body+='</tbody></table>';
                html+=body;
            }
            html+='</div>';
            if(item.itd){
                html+=`<p>${item.itd}</p>`
            }
            html+='</div>';
        })
        this.apiHtml=html;
    }
    apiHtml:string;
    isArr=(val:any)=>val instanceof Array;
}