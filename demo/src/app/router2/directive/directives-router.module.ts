import {NgModule} from '@angular/core';
import {ShareModule} from '../../share.module';
import {RouterModule} from '@angular/router';
import {GridComponent} from './grid/grid.component';
import {StickyComponent} from './sticky/sticky.component';
const routes:Array<any>=[
    {path:'',pathMatch:'full',redirectTo:'grid'},
    {path:'col-show',component:GridComponent},
    {path:':id',component:StickyComponent}
]

@NgModule({
    imports:[
        ShareModule,
        RouterModule.forChild(routes)
    ],
    declarations:[
        GridComponent,
        StickyComponent
    ]
})
export class DirectiveRouterModule{

}