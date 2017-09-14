import {NgModule,ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirectionModule} from './direction/direction.module';

import {ComponentModule} from './component/component.module';
import {Pipes} from './pipe/pipes';
import {serviceList} from './service/service.module';
import {TimePipe} from './pipe/time.pipe';
import {LimitPipe} from './pipe/limit.pipe';

export {
    innerTp,
    CollapseComponent,
    CarsouselComponent,
    SideNavComponent,
    navSideDirective,
    ModalComponent,
    TooltipComponent,
    TooltipDirective,
    MinModalComponnet,
    FooterNoticeComponent,
    ScrollComponent,
    ngzTabComponent,
    SliderComponent,
    HandMoveDirective,
    MenuComponent
}from './component/component.module';

export {
    Highlight,
    ClickCopyDirective,
    ngzForInDirective,
    GridDirective,
    StickyBlockDirective
}from './direction/direction.module';

export {
    Resize,
    ToolService,
    GlobService,
    PositionService,
    ScrollService
}from './service/service.module';


@NgModule({
    imports:[
        CommonModule,
        DirectionModule,
        ComponentModule
    ],
    declarations:[
        TimePipe,
        LimitPipe
    ],
    exports:[
        CommonModule,
        DirectionModule,
        ComponentModule,
        TimePipe,
        LimitPipe
    ]
})
export class ngzModule{
    static forRoot():ModuleWithProviders{
        return{ngModule:ngzModule,providers:serviceList}
    }
}