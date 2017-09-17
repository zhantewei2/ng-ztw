import {Injectable} from '@angular/core';
import {Resize} from '../../../ngzModule/service/resize.service';
@Injectable()
export class MainService{
    allColors=['p','d','w','s','i','l'];
    allSpace=[0,1,2,3,4,5];
    allColors2=this.allColors.concat(['dark']);
    constructor(
        public _res:Resize
    ){}
    navTp:any;
    closeNav(){}
    repairH(){
        window.scrollTo(0,600);
    }
}