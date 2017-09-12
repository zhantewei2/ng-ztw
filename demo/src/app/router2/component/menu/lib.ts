export const lib:any={
    code1:`
<ng-template #tp1>
        <li class="dropdown-list-item -hover-{{type}} between">
            <i class="fa fa-home"></i>Home
        </li>
        <li class="dropdown-list-item -hover-{{type}} between">
            <i class="fa fa-book"></i>Library
        </li>
        <li class="dropdown-list-item -hover-{{type}} between">
            <i class="fa fa-pencil"></i>Pencil
        </li>
</ng-template>
<button (click)="type='w'" [ngz-menu]="tp1"  class="btn btn-w">Menu Bottom</button>
<button (click)="type='s'" [ngz-menu]="tp1" placement="top" class="btn btn-s">Menu Up</button>
<button (click)="type='i'" [ngz-menu]="tp1" placement="left" class="btn btn-i">Menu Left</button>
<button (click)="type='d'" [ngz-menu]="tp1" placement="right" class="btn btn-d">Menu Right</button>
    `,
    code3:`
<ng-template #tp2>Example</ng-template>
<button disabled #control="ngz-menu" [ngz-menu]="tp2" class="btn btn-p">container</button>
    <button (click)="control.toggle()" class="btn0 btn-o-s mx-2">
    toggle
    </button>
<button [ngz-menu]="tp2" disDocument="true" class="btn btn-p">disDocument</button>`,
    api:[
        {title:'<var>@Input</var>',
            body:[
                ['ngz-menu','传入template'],
                ['disDocument','取消document的点击监听'],
                ['placement','"top"|"right"|"bottom（default）"|"left"'],
                ['disCache','取消缓存。<br>ngz会缓存menu content，首先在某些情况下清除整个Component是有必要的。其次在<samp>ngz-menu</samp>没有被摧毁时，如果传入的<samp>template</samp>内,存在一个组件需要调用<samp>hook life</samp>,生命钩子将不会被触发，' +
                '因为注入的组件没有被<samp>destroy</samp>,只是移除了Element，这种行为和<samp>ng-content</samp>有些相似。但你可以使用<samp>disCache</samp>来取消这种缓存。']
            ]
        },
        {title:'<var>Methed</var>',
            body:[
                ['open()'],
                ['close()'],
                ['toggle()']
            ]

        }
    ]
}