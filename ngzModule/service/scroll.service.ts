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
    constructor(public pos:PositionService){
        const scrollOb=Observable.fromEvent(window,'scroll').map((event:any)=>this.getPos());
        const endOb=scrollOb.debounceTime(150);
        this.scrollEvent=scrollOb.merge(endOb);
    }
    getPos=()=>{
        const top=this.getScrollTop();
        return {top:top,bottom:top+window.innerHeight};
    };
    getScrollTop=()=>window.pageYOffset;
    getScrollEnd=()=>document.querySelector('body').scrollHeight;
    scrollEvent:Observable<ScrollEvent>;
}