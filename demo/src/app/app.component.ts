import {Component,ViewChild} from '@angular/core';
import {MainService} from './main.service';
import {MainHomeComponet} from './home/home.component';
@Component({
    selector:'app-root',
    templateUrl:'./app.component.html'
})
export class AppComponent{

    useSide:boolean=true;
    constructor(public _main:MainService){}
    @ViewChild('navSide')navSide:any;
    ngOnInit(){
        this._main.closeNav=()=>this.navSide.close();
    }
    routerActivate(e:any){
        this.useSide=!(e==MainHomeComponet||e instanceof MainHomeComponet);
    }
}