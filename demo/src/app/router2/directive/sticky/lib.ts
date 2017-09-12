export const lib:any={
    sticky:{
        html:`
 <div top="80" style="height:100px;width:50px;" class="alert hazy-w color-dark" ngz-sticky>222</div> 
 `,m:`当浏览器支持<samp>position:sticky</samp>使用CSS，不支持时，使用JS实现。`,
  api:[
      {title:'<var>@Input</var>',
          body:[
              ['top',':number','（px）指定高度'],
              ['useJs',':boolean','强制只使用JS']
          ]},
      {title:'<var>Method</var>',
          body:[
              ['cal()','使用JS时，如果你改变了对象的高度，你可能需要调用这个方法']
          ]
      },
      {title:'<var>@Output</var>',
          body:[['(state)','返回当前使用的模式 <em>css</em> | <em>js</em>']]
      }
  ]},
    clickCopy:{
        html:`<button class="btn btn-lg btn-l" ngz-clickCopy="点击上面按钮复制此内容">CLICK COPY</button>`,
        api:[
            {title:'<var>@Output</var>',
             body:[['(copyComplete)','获得复制完成的回调']]
            }
        ]
    },
    highlight:{
        code:`<header>EXAMPLE SHOW</header>
<article>
    <p class="content">Content</p>    
    <input required type="text" class="form-c">
</article>
   `,
    html:`<pre [highlight]="codeExample" language="html"></pre>`
    ,
    api:[{
        title:'<var>@Input</var>',
         body: [
             ['lightlight','接口'],
             ['language','<em>js</em> | <em>html</em>']]
        }
    ]
    },
    ForIn:{
        html:`<div class="list-group">
    <div *ngzFor="let i in obj ; value as value" class="list-item">
         {{i}}
         <span class="b-w">{{value}}</span>
    </div>
</div>`
    },
    handEvent:{
        html:`<div class="bg-s center" (direction)="hand=$event" style="height:200px;" ngz-handEvent>
    {{hand}}
</div>`,
        api:[
            {title:'<var>@Output</var>',
             body:[
                 ['direction','$event:Array<"up"|"down"|"left"|"right">'],
                 ['handUp',],
                 ['handDown'],
                 ['handLeft'],
                 ['handRight']
             ],
             count:2
            }
        ]
    },
    handMove:{
        html:`<div class="card-block p-2 bg-l" style="height:200px;">
    <div #myMove="ngz-handMove" (offset)="pos=$event" class="bg-p hazy-p" style="width:50px;height:50px;" ngz-handMove>
    </div>
</div>
<p class="color-w">
    尝试拖动上面方块{{pos|json}}
    <button class="btn btn-p" (click)="myMove.moveTo({x:0.5,y:0.5})">moveTo Center</button>
</p>
        `,
        api:[
            {title:'<var>@Input</var>',
              body:[
                ['preventDefault',':boolean 阻止默认的拖动行为'],
                ['parent',':Element 指定容器，默认为父元素']
              ]
            },
            {title:'<var>@Output</var>',
             body:[
                 ['offset','输出元素原点相对于容器的位置'],
                 ['documentOffset','输出元素原点相对于document的位置']
             ]},
            {title:'<var>Method</var>',
             body:[
                 ['moveTo(params,opts?)',
                 {title:'params',
                  content:[
                      {pre:'x:number',value:' x的小数百分比'},
                      {pre:'y:number',value:' y的小数百分比'},
                      {pre:'px?:boolean' ,value:'使用px为单位'}
                  ]}],
                 ['calParent()'],
                 ['calSelf()']
             ],
                count:2
            }

        ]
    }
}