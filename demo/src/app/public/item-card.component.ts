import {Component,Input} from '@angular/core';
@Component({
    selector:'item-card',
    template:`
        <div class="mb-5">
            <p class="mb-2">
                <strong >
                    <i *ngIf="!noMark" class="fa fa-bookmark"></i>
                    <span [innerHTML]="myTitle">
                    </span>
                </strong>
            </p>
            <div *ngIf="!noHr" class="modal-divide"></div>
            <div class="my-1">
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class ItemCardComponent{
    @Input()myTitle:any;
    @Input()noHr:boolean;
    @Input()noMark:boolean;
};