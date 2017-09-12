export const lib={
  code1:`<ngz-scroll baseLine="55" [(ngModel)]="scrollValue">
  <p>请尝试滚动页面</p>
  <div sticky="55px" ngz-scroll-item="exhibition">
      <a> scroll Value is <var>{{scrollValue||'undefined'}}</var></a>
      <div>
          <div class="btn-group">
              <button (click)="scrollValue=i" [class.active]="i==scrollValue" class="btn btn-p" *ngFor="let i of scrollList">{{i}}</button>
          </div>
      </div>
  </div>
  <div class="p-2 my-1 bg-l center lg" style="height:300px;"  *ngFor="let i of scrollList;index as index;" [ngz-scroll-item]="i">
      {{i}}
  </div>
</ngz-scroll>`,
  code2:``
};
export const apiLib=[
  {title:'<var>@Input</var>',
    body:[
      ['[(ngModel)]','绑定值，get时获取滚动值，set时默认调用<em>scrollTo</em>'],
      ['baseLine','(px)设置滚动基线，默认为0'],
      ['justScroll','仅使用滚动函数，不对对象进行监听'],
      ['throttleTime','滚动监听的<em>throttleTime</em>，默认为0']
    ]
  },
  {
    count:2,
    title:'<var>Method</var>',
    body:[
      ['calControls()','重新计算所有绑定对象的位置，虽然大多数时候你不需要它。'],
      ['scrollTo(params)<br>:Promise',{title:'Params',content:
          [{pre:'value:any',value:'为scrollItem绑定的值'},'duration?(ms):number','vt?(ms):number',{pre:'notBottom?:boolean',value:'默认为false,为true时不会滚动到最底部'}]
      }],
      ['scrollTo2(params2)<br>:Promise',{
        title:'Params2',
        content:[
          {pre:'value(px):number',value:'指定滚动的位置'},
          'duration?',
          'vt?',
          'notBottom?',
          {pre:'timing:out|in|null',value:'滚动曲线,默认为<em>null</em>相当于ease-out-in'}
        ]
      }],
      ['scrollToNode <small>(node:Element,params:Params2)</small>']
    ]
  }
];
export const apiLib2:any=[
  {
    title:'<var>@Input</var>',
    body:[
      ['sticky','模式为<em>sticky</em>,接受一个值作为高度,比如<em>60px</em>'],
      ['useEntry',':boolean=false(default)']
    ]
  },
  {
    title:'<var>@Output</var>',
    body:[
        ['(entry)','在useEntry=true时可用,获得滚动基线相对于该组件的事件，$event:"up"|"in"|"down"']
    ]
  }
]