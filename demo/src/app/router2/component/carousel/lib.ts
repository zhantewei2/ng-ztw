export const lib:any={
  code1:`
<ngz-carousel>
    <ngz-carousel-item src="...imgPath">
        <div class="carousel-item-header color-wt">
            <h3><kbd class="b-w">ngz Carousel</kbd></h3>
            <p>carousel-item-header</p>
        </div>
    </ngz-carousel-item>
    
    <ngz-carousel-item src="...imgPath"></ngz-carousel-item>
    <ngz-carousel-item src="...imgPath"></ngz-carousel-item>
</ngz-carousel>
  `,
  api:[
    {title:'<var>@Input</var>',
    body:[
        ['cycle',':boolean 循环 default=true'],
        ['height',':number 指定carousel的高，默认宽为100%.'],
        ['btnSize',':number(px) 设置导航按钮的大小'],
        ['autoPlay',':"left":"right":null　使用自动播放并设置方向，默认为null 不自动播放'],
        ['interval','自动播放的间隔时间(ms)']
    ]
    },
    {title:'<var>Method</var>',
    body:[
        ['pause','暂停播放'],
        ['play','继续播放，需要autoPlay为true'],
        ['selectItem（index:number）','指定跳转,index为其序号'],
        ['next','播放下一个']
    ]
    }
  ]
}