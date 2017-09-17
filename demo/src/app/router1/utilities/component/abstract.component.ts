import {Component,Input} from '@angular/core';
@Component({
    selector:'util-table',
    template:`
        <table class="table table-stripe sm">
            <thead>
                <th>Class</th>
                <th>Abstract</th>
            </thead>
            <tbody>
                <tr *ngFor="let i of lib">
                    <td>{{i[0]}}</td>
                    <td>{{i[1]}}</td>
                </tr>
            </tbody>
        </table>
    
    `
})
export class UtilTableComponnet{
    @Input()lib:any;
}