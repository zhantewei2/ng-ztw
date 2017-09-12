export const lib={
  code1:`
<h4 >插入string</h4>
<p class="center">
    <button class="mx-2 btn btn-w" *ngFor="let i of posArr" ngz-tooltip="{{i}}" [placement]="i">{{i}}</button>
</p>
<h4>插入template</h4>
<p class="center">
    <button [ngz-tooltip]="tp1" class="mx-2 btn btn-p">TP tooltip</button>
    <ng-template #tp1>
        I am a <kbd>Template</kbd>
    </ng-template>
    <button pure="true" [ngz-tooltip]="tp2" class="mx-2 btn0 btn-s">Pure TP tooltip</button>
    <ng-template #tp2>
        <div class="card p-3 color-p"> pure Tooltip</div>
    </ng-template>
</p>
<h4>自定义animate</h4>
<p class="center">
    <button [showStyle]="{transform:'translateY(0)',opacity:1}"
            [hidStyle]="{transform:'translateY(-100%)',opacity:0}"
            class="btn0 btn-o-p" ngz-tooltip="customize animate">
        customize animate
    </button>
</p>`,
    code2:`posArr:Array<string>=['top','left','right','bottom'];`,
    globCode:`import {GlobService} from '@ngZtw/service/glob.service';
...
...component{
   constructor(glob:GlobService){
     glob.tooltip.showStyle={transform:'translateY(0)'};
     glob.tooltip.hidStyle={transfrom:'translateY(-100%)'};
   } 
}`
};