import { Pipe, PipeTransform } from '@angular/core';
class DateObj{
  y:number;
  M:number;
  d:number;
  h:number;
  m:number;
  constructor(date:Date){
    this.y=date.getFullYear();
    this.M=date.getMonth();
    this.d=date.getDate();
    this.h=date.getHours();
    this.m=date.getMinutes();
  }
}

@Pipe({
  name: 'ngzTime'
})
export class TimePipe implements PipeTransform {
  transform(value:string, args?: any): any {
    let now:any=new Date(),
      pre:any=new Date(value),
      nowObj:any=new DateObj(now),
      preObj:any=new DateObj(pre);
    const sm=1000,mm=sm*60,hm=mm*60,dm=hm*24;
    const mFn=(mi:any)=>{
      let h=Math.floor(mi/hm);
      if(h>0){
        const m=Math.ceil(mi%hm/mm);
        return h+'小时'+(m?m+'分钟前':'');
      }
      let m=Math.floor(mi/mm);
      if(m>0)return m+'分钟前';
      let s=Math.floor(mi/sm);
      return (s||1)+'秒前';
    };
    let disMi:any=now-pre;
    let str;
    if(disMi<=dm){
      str=mFn(disMi);
    }else{
      const _db=(n:any)=>n.length>1?n:'0'+n;
      for(let i in nowObj){
        let dis=nowObj[i]-preObj[i];
        if(dis){
          str=i=='d'?dis+'天前'+_db(preObj.h)+':'+_db(preObj.m):preObj.y+'-'+(preObj.M+1)+'-'+preObj.d;
        }
      }
    }
    return str;
  }

}
