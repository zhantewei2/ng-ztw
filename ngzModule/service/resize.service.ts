import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {debounce} from '../tool/debounce';
const sm:number=720;
const lg:number=1140;
/*
    sm<720;
    1140>md>=720
    lg>=1140
 */
@Injectable()
export class Resize{
    value:string;
    valSub:Subject<string>=new Subject();
    constructor(){
        this.compare();
        window.addEventListener('resize',debounce((e:any)=>{
            this.compare();
        },200));
    }
    compare(){
        let width=window.innerWidth;
        this.value=width<sm?'sm':(width>=lg?'lg':'md');
        this.valSub.next(this.value);
    }
}