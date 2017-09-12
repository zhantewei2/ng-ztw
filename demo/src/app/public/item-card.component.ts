import {Component,Input} from '@angular/core';
@Component({
    selector:'item-card',
    template:`
        <div class="mb-5">
            <p class="mb-2">
                <strong >
                    <i class="fa fa-bookmark"></i>{{myTitle}}
                </strong>
            </p>
            <div class="modal-divide"></div>
            <div class="my-1">
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class ItemCardComponent{
    @Input()myTitle:any;
};