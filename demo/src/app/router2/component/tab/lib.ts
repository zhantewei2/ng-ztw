export const lib={
  code1:`
<ngz-tab class="card-block" [type]="tabType">
  <button ngz-tabBtn>TAB1</button>
  <button ngz-tabBtn>TAB2</button>
  <button ngz-tabBtn>TAB3</button>
  <div *ngz-tabContent>
    content1
  </div>
  <div *ngz-tabContent>
    content2
  </div>
  <div *ngz-tabContent>
    content3
  </div>
</ngz-tab>
  `,
  code2:``,
  apiLib:[
    {
      title:'<var>@Input</var>',
      body:[
          ['defaultIndex','设置初始打开项，默认为<em>0</em>'],
          ['type','设置主题'],
          ['appendNav','附加一个导航样式,如："<samp>tab-btn-group-sm- |<em>0</em>|<em>1</em>|<em>2</em></samp>"，或者可以自定义'],
          ['appendBlock','给container附加样式'],
          ['disabledDefault',':boolean 取消默认的按钮样式'],
      ]
    },
    {
      title:'<var>@Output</var>',
      body:[
          ['(select）','<em>$event</em>为被选择的index']
      ]
    },
    {
      title:'<var>method</var>',
      body:[
          ['open(index:number)','指定一个打开项']
      ]
    }
  ]
};