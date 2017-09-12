import {Component,Input,ViewChild} from '@angular/core';
@Component({
    selector:'my-code',
    template:`
        <div class="rel container-card" *ngIf="_code;else another">
            <p>
                <span #tip="ngzTooltip"  (copyComplete)="complete()" 
                      [ngz-clickCopy]="_code" [ngz-tooltip]="copyState" [class.bg-p]="copyOver" 
                      (mouseleave)="mouseleave()" (mouseenter)="mouseenter()" class="abs-tr">Copy</span>
            </p>
            <ng-template #tip>
                <div>{{copyState}}</div>
            </ng-template>
            <pre class="pt-1" [highlight]="_code" [language]="type"></pre>
        </div>
        <ng-template #another>
            <h3 class="center m-2 color-d">
                nobady
            </h3>
        </ng-template>
    `
})
export class CodeComponent{
    copyOver:boolean;
    copyState:string='Copy to clipboard';
    mouseenter(){
        this.copyOver=true;
    }
    mouseleave(){
        this.copyOver=false;
    }
    _code:string;
    type:string;
    @ViewChild('tip')tip:any;
    complete(){
        this.tip.onceShow('Copied!')
    }
    @Input()set js(val:string){
        this.type='js';
        this._code=val;
    }
    @Input()set html(val:string){
        this.type='html'
        this._code=val;
    }
}

