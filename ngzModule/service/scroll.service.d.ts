import { PositionService } from '../tool/pos.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
export interface ScrollEvent {
    top: number;
    bottom: number;
}
export declare class ScrollService {
    pos: PositionService;
    constructor(pos: PositionService);
    getPos: () => {
        top: number;
        bottom: number;
    };
    getScrollTop: () => number;
    getScrollEnd: () => number;
    scrollEvent: Observable<ScrollEvent>;
}
