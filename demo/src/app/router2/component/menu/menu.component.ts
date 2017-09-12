import {Component} from '@angular/core'
import {lib} from './lib';
@Component({
    templateUrl:'./menu.html'
})
export class MenuComponent{
    lib:any=lib;
    type:any;
}