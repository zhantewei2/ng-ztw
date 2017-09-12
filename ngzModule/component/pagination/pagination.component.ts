import {Component,Input,forwardRef,ElementRef,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector:'ngz-pagination',
    template:`
        <button (click)="selectPage(1)" [disabled]="bLeft||disabled" *ngIf="boundaryLinks" class="btn0 btn-{{type}}">
            <a [class.rotate45]="_vertical">««</a>
        </button>
        <button [disabled]="nowPage==1||disabled" (click)="selectPage(nowPage-1)" class="btn0 btn-{{type}}">
            <a [class.rotate45]="_vertical">«</a></button>  
        <button [disabled]="disabled" (click)="selectPage(i)" [class.active]="i==nowPage" [ngClass]="'btn-'+type" class="btn0" *ngFor="let i of btnArr;">
            {{i}}
        </button>
        <button [disabled]="nowPage==pages||disabled" (click)="selectPage(nowPage+1)" class="btn0 btn-{{type}}">
            <a [class.rotate45]="_vertical">»</a>
        </button>
        <button (click)="selectPage(pages)" [disabled]="bRight||disabled" *ngIf="boundaryLinks" class="btn0 btn-{{type}}" style="font-size:12px">
            <a [class.rotate45]="_vertical">»»</a>
        </button>
    `,
    providers:[{
        provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>Pagination),multi:true
    }],
    host:{
        'class':'btn-group'
    },
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class Pagination{
    el:any;
    constructor(
        _el:ElementRef,
        private _cd:ChangeDetectorRef
    ){this.el=_el.nativeElement}
    @Input('btn-size')set btnSize(val:any){
        if(!val)return;
        const classStr=this.el.className;
        this.el.className=classStr.replace(/btn-group-(sm|lg)/,'');
        val!='default'&&this.el.classList.add('btn-group-'+val);
    }
    _vertical:boolean;
    @Input()set vertical(val:boolean){
        if(val){
            this.el.classList.remove('btn-group');
            this.el.classList.add('btn-group-vertical');
            this._vertical=val;
        }
    }
    @Input()boundaryLinks:boolean;
    @Input()autoSkip:boolean=true;
    @Input()type:string='o-p';
    @Input()pageSize:number=10;
    @Input()size:number=5;
    @Input()rotated:boolean;
    @Input()set total(val:number){
        if(!val)return;
        this.pages=Math.ceil(val/this.pageSize);
        this.maxRange=Math.ceil(this.pages/this.size);
    }
    @Input()disabled:boolean;
    bLeft:boolean;
    bRight:boolean;
    nowPage:number;
    btnArr:Array<number>=[];
    pages:number=5;
    maxRange:number=1;
    changeFn:Function;
    preMin:number;
    setArr(val:number){
        let min=Math.floor((val-1)/this.size)*this.size,max=min+this.size;
        if(!this.rotated){
            if(!this.autoSkip){
                min++;
                max=max>this.pages?this.pages:max;
            }else{
                min=min===0?1:min;
                max=max+1>this.pages?this.pages:max+1;
            }
        }else{
            //rotated:
            const
            dis=1-this.size%2,
            len=Math.floor(this.size/2),
            leftL=len-dis,
            rightL=len;
            min=val-leftL;
            if(min<leftL){
                min=1;
            }else{
                max=val+rightL;
            }
            const over=max-this.pages;
            if(over>0){
                min-=over;
                if(min<1)min=1;
                max=this.pages;
            }
        }

        //boundaryLinks
        if(this.boundaryLinks){
            this.bLeft=min==1;
            this.bRight=max/this.size==this.maxRange;
        }
        if(this.preMin!==min){
            const arr=[];
            for(let i=min;i<=max;i++){
                arr.push(i);
            }
            this.btnArr=arr;
        }
        this.preMin=min;
        this._cd.markForCheck();
        setTimeout(()=>{
            this.nowPage=val;
            this._cd.markForCheck();
        })
    }
    selectPage(page:number){
        if(page==this.nowPage)return;
        this.changeFn(page);
        this.setArr(page);
    }
    registerOnTouched(){}
    registerOnChange(fn:any){
        this.changeFn=fn;
    }
    writeValue(val:number){
        val&&this.setArr(val);
    }
}