import{NgModule} from '@angular/core';
import {ShareModule} from '../../share.module';
import {RouterModule} from '@angular/router';
import {TextEditorComponent} from './text-editor/text-editor.component';
import {ngzTextEditorModule} from '../../../../../ngz-text-editor/ngz-text-editor.module';
import {IndexDBComponent} from './indexdb/indexDB.component';
const routes=[
    {path:'',redirectTo:'text-editor',pathMatch:'full'},
    {path:'text-editor',component:TextEditorComponent},
    {path:'indexDB',component:IndexDBComponent}
]

@NgModule({
    imports:[
        ShareModule,
        ngzTextEditorModule,
        RouterModule.forChild(routes)
        ],
    declarations:[
        TextEditorComponent,
        IndexDBComponent
    ]
})
export class ExprimentModule{

}