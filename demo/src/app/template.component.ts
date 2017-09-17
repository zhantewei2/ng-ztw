import {Component,Input} from '@angular/core';
import {Resize} from 'service/resize.service';
@Component({
    selector:'my-template',
    template:`
        <h2>{{title}}</h2>
        <item-card noHr="true" myTitle="Example">
            <ngz-tab appendNav="tab-btn-group-sm-1"  *ngIf="!noTab" type="p">
                <button ngz-tabBtn>EXAMPLE</button>
                <button ngz-tabBtn>HTML</button>
                <button ngz-tabBtn *ngIf="lib.code2">CODE</button>
                <div *ngz-tabContent>
                    <ng-content select=".example"></ng-content>
                </div>
                <div *ngz-tabContent>
                    <my-code [useIndex]="true" [html]="lib.code1"></my-code>
                </div>
                <div *ngz-tabContent>
                    <my-code [js]="lib.code2"></my-code>
                </div>
            </ngz-tab>
            <div class="my-2">
                <ng-content select=".example-footer"></ng-content>
            </div>
        </item-card>
        <item-card myTitle="API">
            <ng-content select=".API"></ng-content>
        </item-card>
    `
})
export class MyTemplateComponent{
    @Input()noTab:boolean;
    @Input('title0')title:any;
    @Input()lib:any={};
    constructor(public res:Resize){}
}