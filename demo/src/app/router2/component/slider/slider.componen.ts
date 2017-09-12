import {Component} from '@angular/core';
import {lib,api} from './lib';
@Component({
    templateUrl:'./slider.html'
})
export class SliderComponent{
    lib:any=lib;
    api:any=api;
    sliderValue:number=10;
    sliderValue2:number=20;
}