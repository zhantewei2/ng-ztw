import {Component,ViewChild} from '@angular/core';
import {MainService} from '../main.service';
@Component({
    templateUrl:'./input.html'
})
export class InputComponent{
    constructor(public main:MainService){}
    ngAfterViewInit(){


    }
    code1=``;
    code2=`
<div class="input-group">
    <label class="color-p">label</label>
    <input type="number" placeholder="holder" class="form-c control-p">
    <button class="btn btn-p">btn</button>
</div>
    `;
    code3=`
<div class="py-1 mb-2" *ngFor="let i of main.allColors">
    <label class="color-{{i}}">form-c control-{{i}}</label>
    <input class="form-c control-{{i}}">
</div>`
}