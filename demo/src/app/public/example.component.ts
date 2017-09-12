import {Component,Input} from '@angular/core';
@Component({
    selector:'my-example',
    template:`
        <!--
        <ngz-tab [type]="type">
            <button ngz-tabBtn>EXAMPLE</button>
            <button ngz-tabBtn>CODE</button>
            <div ngz-tabContent>
                <ng-content select=".myc1"></ng-content>
            </div>
            <div ngz-tabContent>
                <ng-content select=".myc2"></ng-content>
            </div>
        </ngz-tab>
        -->
    `
})
export class myExample{
    @Input()type:string='p';
}