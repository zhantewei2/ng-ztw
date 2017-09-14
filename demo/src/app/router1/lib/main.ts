export const lib={
    listGroup:`
<ul class="list-group">
    <li class="list-item -hover" *ngFor="let i of lists">
    {{i.h}}
    </li>
</ul>
<ul class="list-group">
    <li class="list-item-{{i.type}}" *ngFor="let i of lists">
        <header class="item-head">{{i.h}}</header>
        <article class="item-body">{{i.c}}</article>
    </li>
</ul>
    `,
    dropdown1:`    
<div *ngFor="let i of btnArr" (click)="$event.stopPropagation()" class="m-2 dropdown{{i.dr}}">
    <button (click)="i.show=!i.show" (document:click)="i.show=false" class="btn0 btn-o-w dropdown-btn">
        {{i.dr}}
    </button>
    <div [class.show]="i.show" class="dropdown-menu">
        dropdown-menu {{i.value}}
    </div>
</div>
    `,
    dropdown2:`
btnArr=[
    {dr:'',show:false},
    {dr:'-top',show:false},
    {dr:'-left',show:false},
    {dr:'-right',show:false}
];
    `,
    dropdown3:`
<div class="dropdown">
    <button (click)="showList=!showList" class="btn btn-p dropdown-btn">
        List
    </button>
    <ul [class.show]="showList" class="dropdown-list">
        <li (click)="listSelect=i" [class.active]="listSelect==i" *ngFor="let i of menuList" class="dropdown-list-item">{{i}}</li>
    </ul>
</div>
    `,
    dropdown4:`
<div (click)="$event.stopPropagation()" *ngFor="let i of colorArr" class="dropdown m-1">
    <button (document:click)="i.show=false" (click)="i.show=!i.show" class="btn btn-{{i.color}} dropdown-btn">
        -hover-{{i.color}}
    </button>
    <ul class="dropdown-list" [class.show]="i.show">
        <li [class.active]="i.select==j" (click)="i.select=j" class="dropdown-list-item -hover-{{i.color}}" *ngFor="let j of menuList">{{j}}</li>
    </ul>
</div>
    `,
    dropdown5:`
this.colorArr=main.allColors.map((color:string)=>{return {color:color,show:false,select:null}})
    `
}