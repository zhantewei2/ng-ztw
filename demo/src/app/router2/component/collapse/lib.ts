export const lib={
    code1:`
<ngz-collapse>
    <ngz-collapse-item open="true">
        <span ngz-collapse-btn>Item1</span>
        content
        <p>p1</p>
        <p>p2</p>
    </ngz-collapse-item>
    <ngz-collapse-item open="true">
        <span  ngz-collapse-btn>Item2</span>
        <div class="card w-100 p-3">
            content
        </div>
    </ngz-collapse-item>
    <ngz-collapse-item>
        <span  ngz-collapse-btn>Item3-Inner</span>

        <ngz-collapse>
            <ngz-collapse-item>
                <button ngz-collapse-btn>inner1</button>
                innerContent1
            </ngz-collapse-item>
            <ngz-collapse-item>
                <button ngz-collapse-btn>inner2</button>
                innerContent2
            </ngz-collapse-item>
        </ngz-collapse>

    </ngz-collapse-item>
</ngz-collapse>`,
    api:[
        {
            title:'<var>@Input</var>',
            body:[
                ['type','设置主题,为null时，取消样式'],
                ['noAnimate','不使用动画']
            ]
        }
    ],
    api2:[
        {title:'<var>@Input</var>',
        body:[
            ['open',':boolean 设置初始为打开状态']
        ]
        },
        {
        title:'Property',
            body:[
                ['isOpen',':boolean'],
                ['index',':number']
            ]
        },
        {title:'<var>Method</var>',
         body:[
             ['open()'],
             ['close()'],
             ['toggle()']
         ]
        }
    ]
}