import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ShareModule} from '../share.module';
import {HomeComponent} from './home.component';
import {NavComponent} from './nav.component';
import {BtnComponent} from './btn.component';
import {InputComponent} from './input.component';
import {ListGroupComponent} from './list-group.component';
import {CardComponent} from './card.component';
import {DropdownComponent} from './dropdown.component';
import {TooltipComponent} from './tooltip.component';
import {BadgeComponent} from './badge.component';
import {TableComponent} from './table.component';
import {AlertComponent} from './alert/alert.component';

const routing:any=[
    {   path:'',
        component:HomeComponent,
        children:[
            {path:'',redirectTo:'btn',pathMath:'full'},
            {path:'nav',component:NavComponent},
            {path:'btn',component:BtnComponent},
            {path:'list-group',component:ListGroupComponent},
            {path:'input',component:InputComponent},
            {path:'card',component:CardComponent},
            {path:'dropdown',component:DropdownComponent},
            {path:'tooltip',component:TooltipComponent},
            {path:'badge',component:BadgeComponent},
            {path:'table',component:TableComponent},
            {path:'alert',component:AlertComponent},
            {path:'utilities',loadChildren:'./utilities/utilities.module#UtilitiesModule'}
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
      NavComponent,
      BtnComponent,
      ListGroupComponent,
      InputComponent,
      CardComponent,
      DropdownComponent,
      TooltipComponent,
      BadgeComponent,
      TableComponent,
      AlertComponent
  ]
})
export class Router1Module{

}

