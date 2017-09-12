import {Component} from '@angular/core';
@Component({
    templateUrl:'list-group.html'
})
export class ListGroupComponent{
    lists:Array<any>=[
        {h:'head1',c:'content1',type:'p'},
        {h:'head2',c:'content2',type:'s'},
        {h:'head3',c:'content3',type:'d'}
    ];
}