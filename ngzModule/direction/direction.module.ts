import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClickCopyDirective} from './click-copy.directive';
import {Highlight} from './hightlight/highlight.directive';
import {ngzForInDirective} from './for-in.directive';
import {GridDirective} from './grid/grid.directive';
import {StickyBlockDirective} from './sticky-block.directive';
export {ClickCopyDirective} from './click-copy.directive';
export {Highlight} from './hightlight/highlight.directive';
export {ngzForInDirective} from './for-in.directive';
export {GridDirective} from './grid/grid.directive';
export {StickyBlockDirective} from './sticky-block.directive';

const list:Array<any>=[
    Highlight,
    ClickCopyDirective,
    ngzForInDirective,
    GridDirective,
    StickyBlockDirective
]
@NgModule({
    imports:[CommonModule],
    declarations:list,
    exports:list
})
export class DirectionModule{

}