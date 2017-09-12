import {Component} from '@angular/core';
import {lib} from './lib';
@Component({
    templateUrl:'./text-editor.html'
})
export class TextEditorComponent{
    lib:any=lib;
    result:string;
    disResult:boolean;
}