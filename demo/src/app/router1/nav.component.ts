import {Component} from '@angular/core';

@Component({
    templateUrl:'nav.html'
})
export class NavComponent{

    navArr:Array<string>=['item1','item2','item3'];
    navColle:Array<any>=[
        {type:'l',value:null,black:true},
        {type:'p',value:null},
        {type:'i',value:null},
        {type:'w',value:null}
    ]
}