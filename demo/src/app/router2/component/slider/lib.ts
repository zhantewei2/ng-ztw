export const lib={
    code1:`<ngz-slider type="w" style="height:200px;" [(ngModel)]="sliderValue" vertical="true"></ngz-slider>
<p><a class="b-w">{{sliderValue}}</a></p>
<ngz-slider style="width:200px" [(ngModel)]="sliderValue2"></ngz-slider>
<p><a class="b-p color-wt">{{sliderValue2}}</a></p>
<button class="mt-2 btn0 btn-o-p btn-sm" (click)="sliderValue2=50">ScrollTo 50</button>`,
    code2:''
}
export const api:any=[
    {title:'<var>@Input</var>',
        body:[
            ['[(ngModel)]','双向绑定slider的值'],
            ['type','设置slider的主题'],
            ['max','最大数，默认100'],
            ['min','最小数，默认1'],
            ['vertical :boolean','使用垂直的slider']
        ]
    }
]