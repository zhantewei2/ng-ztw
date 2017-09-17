import {NgModule} from '@angular/core';
import {ShareModule} from '../../share.module';
import {RouterModule} from '@angular/router';
import {MainComponent} from './component/main.component';
import {FragItemComponent} from './component/frag-item.component';
import {UtilTableComponnet} from './component/abstract.component';
@NgModule({
    imports:[
        ShareModule,
        RouterModule.forChild([
            {path:'',component:MainComponent}
        ])
    ],
    declarations:[
        MainComponent,
        FragItemComponent,
        UtilTableComponnet
    ]
})
export class UtilitiesModule{

}