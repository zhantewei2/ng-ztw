import {Component} from '@angular/core';
import{code,code2} from './lib/table';
@Component({
    templateUrl:'table.html'
})
export class TableComponent{
    code:string=code;
    code2:string=code2;
    tdArr:any=['td1','td2','td3']
    trArr:any=[1,2,3]
    tableArr:any=['','table-stripe','table-inverse','table-stripe table-inverse']
}