import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LazyComponent} from './lazy.component';
import {RouterModule} from '@angular/router';
const routing=[
    {path:'',component:LazyComponent}
];
@NgModule({
    declarations:[LazyComponent],
    imports:[
        CommonModule,
        RouterModule.forChild(routing)
    ]

})
export class LazyModule{}