import {Component} from '@angular/core';
import {lib} from './lib';
@Component({
    templateUrl:'progressBar.html'
})
export class ProgressBarComponent{
    barValue:number;
    lib=lib;
}