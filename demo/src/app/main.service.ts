import {Injectable} from '@angular/core';
import {Resize} from '../../../ngzModule/service/resize.service';
@Injectable()
export class MainService{
    allColors=['p','d','w','s','i','l'];
    allColors2=this.allColors.concat(['dark']);
    constructor(
        public _res:Resize
    ){}
    navTp:any;
    closeNav(){}
}