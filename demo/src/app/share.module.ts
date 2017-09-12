import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ngzModule} from '@ng-ztw';
 import {myExample} from './public/example.component';
import {CodeComponent} from './public/code.component';
import {MyTemplateComponent} from  './template.component';
import {ItemCardComponent} from './public/item-card.component';
import {MyApiComponent} from './public/API.component';


@NgModule({
    imports:[
        FormsModule,
        ngzModule.forRoot(),
        ReactiveFormsModule
    ],
    declarations:[
        myExample,
        MyApiComponent,
        ItemCardComponent,
        CodeComponent,
        MyTemplateComponent
    ],
    exports:[
        ngzModule,

        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        myExample,
        CodeComponent,
        MyTemplateComponent,
        ItemCardComponent,
        MyApiComponent
    ]
})
export class ShareModule{

}