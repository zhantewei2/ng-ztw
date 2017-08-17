import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {OneComponent} from './1.component';
const routing:any=[
    {path:'child1',component:OneComponent},
    {path:'child2',loadChildren:'./lazyModule/lazy.module#LazyModule'}
];
@NgModule({
  imports:[
      RouterModule.forRoot(routing)
  ],
  exports:[RouterModule]
})
export class RoutingModule{

}

