import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {innerTp} from './innerTemplate';
export {innerTp}from './innerTemplate';

import {CollapseComponent} from './collapse/collapse.component';
export {CollapseComponent} from './collapse/collapse.component';

import {CollaspeBtnDirective} from './collapse/collapseBtn.directive';
import {CollapseItemComponent} from './collapse/collapseItem.component';


import {SideNavComponent} from './side-nav/side-nav.component';
export {SideNavComponent} from './side-nav/side-nav.component';

import {ModalComponent} from './modal/modal.component';
export {ModalComponent} from './modal/modal.component';

import {TooltipComponent} from './tooltip/tooltip.component';
import {TooltipDirective} from './tooltip/tooltip.directive';
export {TooltipComponent} from './tooltip/tooltip.component';
export {TooltipDirective} from './tooltip/tooltip.directive'

import {CarsouselComponent,CarouselItemComponent} from './carousel/carousel.component';
export {CarsouselComponent} from './carousel/carousel.component';

import {HandEventDirective} from './hand-event.directive';
import {MinModalComponnet} from './min-modal/min-modal.component';
export {MinModalComponnet} from './min-modal/min-modal.component';

import {FooterNoticeComponent} from './footer-notice/footer-notice.component';
export {FooterNoticeComponent} from './footer-notice/footer-notice.component';

import {ScrollComponent} from './scroll/scroll.component';
export {ScrollComponent} from './scroll/scroll.component';

import {ScrollBindDirective} from './scroll/scrollBind.directive';
import {ngzTabComponent,ngzTabContent,ngzTabBtn} from './ngz-tab/ztw-tab.component';
export {ngzTabComponent} from './ngz-tab/ztw-tab.component';

import {SliderComponent} from './slider/slider.component';
export {SliderComponent} from './slider/slider.component';

import {HandMoveDirective} from './hand-move.directive';
export {HandMoveDirective} from './hand-move.directive';

import {MenuComponent,MenuDirective} from './menu/menu.component';
export {MenuComponent} from './menu/menu.component';

import {Pagination} from './pagination/pagination.component';
export {Pagination} from './pagination/pagination.component';

import {ProgressBarComponent} from './progress-bar/progress-bar.component';
export {ProgressBarComponent} from './progress-bar/progress-bar.component';
const list=[
    innerTp,
    CollapseComponent,
    CollaspeBtnDirective,
    CollapseItemComponent,
    SideNavComponent,
    ModalComponent,
    TooltipDirective,
    TooltipComponent,
    CarsouselComponent,
    CarouselItemComponent,
    HandEventDirective,
    MinModalComponnet,
    FooterNoticeComponent,
    ScrollComponent,
    ScrollBindDirective,
    ngzTabContent,
    ngzTabComponent,
    ngzTabBtn,
    SliderComponent,
    HandMoveDirective,
    MenuComponent,
    MenuDirective,
    Pagination,
    ProgressBarComponent
];



@NgModule({
    imports:[CommonModule],
    declarations:list,
    entryComponents:[TooltipComponent,MenuComponent],
    exports:list
})
export class ComponentModule{

}