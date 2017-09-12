export const lib={
    code1:`
<ngz-progress-bar stripe="true" type="w" value="10"></ngz-progress-bar>
<ngz-progress-bar value="30"></ngz-progress-bar>
<ngz-progress-bar value="40" type="i" showValue="true"></ngz-progress-bar>
<ngz-progress-bar value="60" type="d" stripe="true" showValue="true" animate="true"></ngz-progress-bar>
<ngz-progress-bar value="70" type="s" size="sm" stripe="true" showValue="true"></ngz-progress-bar>`,
    api:[
        {title:'<var>@Input</var>',
        body:[
            ['max','最大值'],
            ['value','当前值'],
            ['stripe',':boolean 添加条纹 default=false'],
            ['size',':"sm"|"lg"设置大小'],
            ['type',':string 主题'],
            ['showValue',':boolean 是否显示百分比 default=false'],
            ['animate',':boolean 使用动画 default=false']
        ]
        }
    ]

}