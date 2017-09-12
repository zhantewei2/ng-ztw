import {ShareModule} from '../share.module';
import{NgModule} from '@angular/core';
import{RouterModule,Route} from '@angular/router';
import {HomeComponent} from './home.component';
import {CollapseComponent} from './component/collapse/collapse';
import {NavSideComponent} from './component/nav-side/nav-side.component';
import {ModalComponent} from './component/modal/modal.component';
import {TooltipComponent} from './component/tooltip/tooltip.component';
import {CarouselComponent} from './component/carousel/carousel.component';
import {MinModalComponent} from './component/min-modal/min-modal.component';
import {FooterNoticeComponent} from './component/footer-notice/footer-notice.component';
import {pipesComponent} from './pipe/pipes.component';
import {ScrollComponent} from './component/scroll/scrolll.component';
import {TabComponent} from './component/tab/tab.component';
import {SliderComponent} from './component/slider/slider.componen';
import {MenuComponent} from './component/menu/menu.component';
import {PaginationComponent} from './component/pagination/pagination.component';
import {ProgressBarComponent} from './component/progress-bar/progressBar.component';
const routing:[Route]=[
    {   path:'',
        component:HomeComponent,
        children:[
            {path:'',redirectTo:'collapse',pathMatch:'full'},
            {path:'collapse',component:CollapseComponent},
            {path:'nav-side',component:NavSideComponent},
            {path:'modal',component:ModalComponent},
            {path:'tooltip',component:TooltipComponent},
            {path:'carousel',component:CarouselComponent},
            {path:'min-modal',component:MinModalComponent},
            {path:'footer-notice',component:FooterNoticeComponent},
            {path:'scroll',component:ScrollComponent},
            {path:'Pipes',component:pipesComponent},
            {path:'tab',component:TabComponent},
            {path:'slider',component:SliderComponent},
            {path:'menu',component:MenuComponent},
            {path:'pagination',component:PaginationComponent},
            {path:'progress-bar',component:ProgressBarComponent},
            {path:'Directive',loadChildren:'./directive/directives-router.module#DirectiveRouterModule'},
            {path:'Expriment',loadChildren:'./expriment/expriment.module#ExprimentModule'}
        ]
    }
];
@NgModule({
    imports:[
        ShareModule,
        RouterModule.forChild(routing)
    ],
    declarations:[
        HomeComponent,
        CollapseComponent,
        NavSideComponent,
        ModalComponent,
        TooltipComponent,
        CarouselComponent,
        MinModalComponent,
        FooterNoticeComponent,
        pipesComponent,
        ScrollComponent,
        TabComponent,
        SliderComponent,
        MenuComponent,
        PaginationComponent,
        ProgressBarComponent
    ]
})
export class Router2Module{}