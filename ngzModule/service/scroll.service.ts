import {Injectable} from '@angular/core';
import {PositionService} from '../tool/pos.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
export interface ScrollEvent{
    top:number;
    bottom:number;
}

@Injectable()
export class ScrollService{
    detectBodyHeight:Observable<any>;
    scrollEvent:Observable<ScrollEvent>;
    constructor(public pos:PositionService){
        const scrollOb=Observable.fromEvent(window,'scroll').map(()=>this.getPos());
        const tailerOb=scrollOb.debounceTime(150);
        const initOb=Observable.timer(1,100).take(2).map(()=>this.getPos());
        this.scrollEvent=scrollOb.merge(tailerOb,initOb);
        let preH:number,nowH,body=document.querySelector('body');
        this.detectBodyHeight=Observable.interval(500).filter(()=>{
            nowH=body.offsetHeight;
            if(nowH!==preH){
                preH=nowH;
                return true;
            }
            return false;
        });
    }
    getPos=()=>{
        const top=this.getScrollTop();
        return {top:top,bottom:top+window.innerHeight};
    };
    getScrollTop=()=>window.pageYOffset;
    getScrollEnd=()=>document.querySelector('body').scrollHeight;

}