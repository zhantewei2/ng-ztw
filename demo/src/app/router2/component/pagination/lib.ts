export const lib:any={
    code1:`
<p>Default pagination</p>
<ngz-pagination [(ngModel)]="pageValue" total="200"></ngz-pagination>
<p><em>autoSkip</em>=false</p>
<ngz-pagination [(ngModel)]="pageValue" total="200" [autoSkip]="false"></ngz-pagination>
<p><em>boundaryLinks</em>=true</p>
<ngz-pagination [(ngModel)]="pageValue" total="200" boundaryLinks="true"></ngz-pagination>
<p><em>rotated</em>=true</p>
<ngz-pagination [(ngModel)]="pageValue" total="200" rotated="true"></ngz-pagination>
    `,
    codeMore:`
<p><samp>type</samp> and <samp>btn-size</samp></p>
<ngz-pagination class="btns-disTransition" [(ngModel)]="pageValue2" total="200" [type]="type2" [btn-size]="btnSize2"></ngz-pagination>
<p>点击以下按钮改变样式或大小</p>
<p class="btn-group">
    <button (click)="type2=i" class="btn btn-{{i}}" *ngFor="let i of main.allColors">{{i}}</button>
</p>
<p class="btn-group">
    <button (click)="type2='o-'+i" class="btn btn-o-{{i}}" *ngFor="let i of main.allColors">o-{{i}}</button>
</p>
<p class="btn-group">
    <button class="btn btn-w" (click)="btnSize2=i" *ngFor="let i of sizeArr">{{i}}</button>
</p> 
    `,
    api:[
        {title:'<var>@Input</var>',
         body:[
             ['[(ngModel)]',':number 双向绑定value'],
             ['total',':number 总条目数'],
             ['size',':number pagination的显示页数　default=5'],
             ['pageSize',':number 每页的条目数　default=10'],
             ['type',':string 设置主题 default="o-p"'],
             ['btn-size',':"default"|"sm"|"lg" default="default"'],
             ['autoSkip',':boolean 是否多出跳转导航 default=true'],
             ['boundaryLinks',':boolean 显示最外层导航 default=false'],
             ['rotated',':boolean 居中跳转 default=false'],
             ['vertical',':boolean 使用垂直的pagination default=false'],
             ['disabled',':boolean 禁用pagination 在加载页面等待时，你可能会使用到它']
         ]
        }
    ]
}