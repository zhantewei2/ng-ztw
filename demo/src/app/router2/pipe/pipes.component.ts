import {Component} from '@angular/core';
import {lib} from './lib';
@Component({
    templateUrl:'pipes.html'
})
export class pipesComponent{
    getTime=(dis:number)=>{
        let date:any=new Date();
        date.setTime(date.getTime()-dis);
        return date;
    }
    times:any=[
        new Date(),
        this.getTime(3000),
        this.getTime(400000),
        this.getTime(6000000),
        this.getTime(600000000)]
    nowTime:any;
    intervalTime:any;
    format:string='yyyy-MM-dd hh:mm:ss';
    ngOnInit(){
        this.nowTime=new Date();
        this.intervalTime=setInterval(()=>this.nowTime=new Date(),1000);
    }
    ngOnDestroy(){
        this.intervalTime&&clearInterval(this.intervalTime);
    }
    limitEn:string='abcdefghjk';
    limitCn:string='中文占两个';
    limitStrs:Array<number>=[8,4,5,10];
}