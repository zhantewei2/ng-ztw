import {Component} from '@angular/core';
import {lib} from './lib/main';
@Component({
    templateUrl:'list-group.html'
})
export class ListGroupComponent{
    lib=lib;
    lists:Array<any>=[
        {h:'head1',c:'content1',type:'p'},
        {h:'head2',c:'content2',type:'s'},
        {h:'head3',c:'content3',type:'d'}
    ];
}