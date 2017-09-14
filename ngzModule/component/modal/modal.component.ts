import {Component,TemplateRef,Input} from '@angular/core';

import {fade,modal} from '../../animate/base';
export interface Content{
    content:any;
    btn?:'single'|'double' |null;
    type?:string;
    lg?:boolean;
    cb?:Function;
    title?:string;
}

@Component({
    selector:'ngz-modal',
    template:`
<div class="modal-bg" [@Fade] (@Fade.done)="fadeDone()"  *ngIf="show" (click)="close()">
    <div [@Modal] (@Modal.done)="modalDone()" (click)="$event.stopPropagation()" [class.modal-lg]="lg" *ngIf="modalShow" class="modal" style="padding:0">
        <div class="modal-header" [ngClass]="[type?'bg-'+type:'',type&&type!='l'?'color-wt':'']">
            <a [innerHTML]="title"></a>
            <strong (click)="close()" class="close">&times;</strong>
        </div>
        <div class="modal-divide"></div>
        <div [class.center]="!bodyIsTp" class="modal-content">
            <div *ngIf="bodyIsTp;else str" [innerTp]="content"></div>
            <ng-template #str>
                <div [innerHTML]="content"></div>
            </ng-template>
        </div>
        <div *ngIf="btn">
            <div class="modal-divide"></div>
            <div class="modal-footer" >
                <button *ngIf="btn=='double'" (click)="this.cb&&this.cb(true);this.close()" class="btn0 btn-{{type||'o-l'}} btn-sm mx-2">确定</button>
                <button (click)="this.cb&&this.cb(false);this.close()" class="btn0 btn-{{type||'o-l'}} btn-sm mx-2">{{btn=='single'?'关闭':'取消'}}</button>
            </div>
        </div>
    </div>
</div>    
    `,
    animations:[fade('.2s'),modal()]
})
export class ModalComponent{
    initMsn(){
        this.lg=undefined;
        this.title=null;
        this.btn='single';
        this.type=undefined;
        this.cb=(e:boolean)=>{};
    }
    constructor(){
    }
    @Input('content')set _content(val:Content){
        this.initMsn();
        if(!val)return;
        this.bodyIsTp=val.content instanceof TemplateRef;
        Object.assign(this,val);
    }
    content:any;
    type:string;
    bodyIsTp:boolean;
    //btn:
    btn:string;
    //type:'d'|'p'|'w'...
    lg:boolean;
    title:string;
    show:boolean;
    modalShow:boolean;
    animateRunning:boolean;
    fadeDone(){
        this.show?this.modalShow=true:this.animateRunning=false;
    }
    modalDone(){
        !this.modalShow?this.show=false:this.animateRunning=false;
    }
    close(){
        if(!this.animateRunning)this.modalShow=false;
    }
    open(){
        this.show=true;
        this.animateRunning=true;
    }
    cb=(e:boolean)=>{};
}