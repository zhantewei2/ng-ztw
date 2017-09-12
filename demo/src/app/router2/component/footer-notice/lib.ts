export const lib={
  code1:`<ngz-footer-notice [(ngModel)]="footerValue" [type]="footerType"></ngz-footer-notice>

<h3>string</h3>
<div class="my-1 btn-group flex-fluid">
<button *ngFor="let i of main.allColors" class="btn btn-{{i}}" (click)="showFooter(i)">show footer</button>
</div>
<h3>Template</h3>
<button class="btn btn-p" (click)="footerValue=tp">show footer</button>
<ng-template #tp>
    This is a Template!
    <hr>
    Footer will be closed after 2 seconds
</ng-template>`,
  code2:`footerValue:any;
    footerType:string;
    constructor(public main:MainService){}
    showFooter(type:string){
        this.footerValue=&#768;The type is <a class="b-&#36{type}">'&#36{type}'</a>&#768;
        this.footerType=type;
    }`,
  api:[{
    title:'@Input',
    body:[
      ['timeout','number|null(ms)','设置自动收回的时间。默认为2000<br>,<em>null</em>可取消自动收回'],
      ['type','string','设置主题，基于基础主题']
    ]
  }]
};