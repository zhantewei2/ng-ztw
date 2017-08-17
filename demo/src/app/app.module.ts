import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {OneComponent} from './router/1.component';
import {RoutingModule} from './router/router.module';
@NgModule({
    declarations:[
        AppComponent,
        OneComponent
    ],
    imports:[
        BrowserModule,
        RoutingModule
    ],
    bootstrap:[AppComponent]
})
export class AppModule{

}