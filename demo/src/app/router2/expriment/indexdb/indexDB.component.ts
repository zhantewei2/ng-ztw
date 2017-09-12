import {Component} from '@angular/core';
import {IndexDB} from '../../../../../../out';
import {lib} from './lib';
@Component({
    templateUrl:'./indexDB.html'
})
export class IndexDBComponent{
    ngzDB:any;
    lib:any=lib;
    constructor(){
        this.ngzDB=new IndexDB('testDB',{publishVersion:1});
        this.ngzDB.use('list2',{keyPath:'name',index:'date',type:'index'}).then((model:any)=>{
            console.log(model);
        })
    }
    indexDB:any=IndexDB;
}