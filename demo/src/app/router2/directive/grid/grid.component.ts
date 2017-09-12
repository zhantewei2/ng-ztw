import {Component,ViewChild,ViewContainerRef} from '@angular/core';
import {lib} from './lib';
@Component({
    templateUrl:'./grid.html'
})
export class GridComponent{
    lib:any=lib;
    constructor(){
        const arr=[1,2,3];
    }
    apiLib:any=[
        {   title:'<var>Class</var> .col',
            head:['','sm','md','lg'],
            body:[
                ['Range','<720px','1140>md>=720','lg>=1140px'],
                {value:['Class prefix','.col-sm-','.col-md-','.col-lg-'],type:'l'},
                {value:['# of columns','12'],type:'w'}
            ],
            count:4,
            itd:'网格只分了三种情况。<em>.col-#</em>,是属于全视窗的网格。'
        },
        {
            title:'<var>Directive</var> ngz-col-show',
            head:['*ngz-col-show=','!sm','sm'],
            body:[
                ['Intends','!=sm<em>(>=720px)</em>','==sm<em>(<720px)</em>'],
                ['Behavior','不为sm时才显示','为sm时才显示']
            ],
            itd:'其余<em>md</em>,<em>lg</em>使用原理相同'
        }
    ]
}