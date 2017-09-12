import {NgModule} from '@angular/core';
import {ShareModule} from './share.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {MainHomeComponet} from './home/home.component';
import {MainService} from './main.service';
const routing:any=[
    {path:'',component:MainHomeComponet},
    {path:'css',loadChildren:'./router1/router.module#Router1Module'},
    {path:'module',loadChildren:'./router2/router.module#Router2Module'}
];
@NgModule({
    declarations:[
        AppComponent,
        MainHomeComponet
    ],
    imports:[
        BrowserModule,
       ShareModule,
        RouterModule.forRoot(routing),
        BrowserAnimationsModule
    ],
    bootstrap:[AppComponent],
    providers:[MainService]
})
export class AppModule{

}