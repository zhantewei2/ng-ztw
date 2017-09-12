import {Injectable} from '@angular/core';
import {ToolService} from '../tool/tool.service';
import {Resize} from './resize.service';
import {PositionService} from '../tool/pos.service';
@Injectable()
export class GlobService{
    constructor(
        public tool:ToolService,
        public res:Resize,
        public pos:PositionService
    ){}
    tooltip:any={
        hidStyle:{opacity:0,transform:'scale(.5,.5)'},
        showStyle:{opacity:1,transform:'scale(1,1)'}
    }
}