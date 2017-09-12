import {Component} from '@angular/core';
@Component({
    templateUrl:'./tooltip.html'
})
export class TooltipComponent{
    tipArr:Array<string>=['top','left','right','bottom'];
    colors:Array<string>=['p','d','s','i'];
    selectTip(obj:any,index:number):any{
        if(!obj)return null;
        let str='';
        for(let i in obj){
            if(obj[i])str+=' '+i+'-'+this.colors[index];
        }
        return str;
    }
    code1:string=`
<span class="btn0 btn-l tooltip">
         top
     <span class="tip-top show">tooltip top</span>
 </span>
    `;
    code2:string=`
<button class="btn0 btn-p tooltip">
    top
    <span class="tip-top">tooltip top</span>
</button>

<button class="btn0 btn-p tooltip">
    top
    <span class="tip-top bg-p border-p">tooltip top</span>
</button>

<button class="btn0 btn-p tooltip">
    top
    <span class="tip-top color-p">tooltip top</span>
</button>   
    `
}