import { ToolService } from '../tool/tool.service';
import { Resize } from './resize.service';
import { PositionService } from '../tool/pos.service';
export declare class GlobService {
    tool: ToolService;
    res: Resize;
    pos: PositionService;
    constructor(tool: ToolService, res: Resize, pos: PositionService);
    tooltip: any;
}
