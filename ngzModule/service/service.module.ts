import {Resize} from './resize.service';
import {ToolService} from '../tool/tool.service';
import {GlobService} from  './glob.service';
import {PositionService} from '../tool/pos.service';
import {ScrollService} from './scroll.service';

export {Resize} from './resize.service';
export {ToolService} from '../tool/tool.service';
export {GlobService} from  './glob.service';
export {PositionService} from '../tool/pos.service';
export {ScrollService} from './scroll.service';

export const serviceList=[Resize,ToolService,GlobService,PositionService,ScrollService];