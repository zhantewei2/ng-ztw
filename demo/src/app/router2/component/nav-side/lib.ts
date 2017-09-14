export const lib={
code1:`
<ng-template #sideTp>
    <div>
        nav side content
    </div>
</ng-template>
<div class="card block" #sideContainer>
    <nav class="smNav nav-inverse bg-w">
        <button [parentEl]="sideContainer" (click)="navSide.toggle()" #navSide="ngz-navSide"
                class="nav-item" [ngz-navSide]="sideTp">
            <i class="fa fa-navicon"></i>
        </button>
    </nav>
    <div style="height:200px;" class="auto">
        <div style="height:400px;" >
        </div>
    </div>
</div>`,
code2:`
<div class="block card rel" #sideContainer2>
    <nav class="smNav abs-top nav-inverse bg-w">
        <a top="35" [parentEl]="sideContainer2" #navSide2="ngz-navSide" [ngz-navSide]="sideTp"></a>
        <button (click)="navSide2.toggle()" class="nav-item">
            <i class="fa fa-navicon"></i>
        </button>
    </nav>
    <div class="bg-l auto" style="height:200px">
        <div style="height:400px">Inner Contnent</div>
    </div>
</div>`,
code3:`
<button class="btn btn-p" top="60" (click)="navSide3.toggle()"
#navSide3="ngz-navSide" [ngz-navSide]="sideTp">Try It</button>`,
api:[
    {title:'<var>@Input</var>',
     body:[
         ['parentEl',':Element 指定父Element，default:<samp>body</samp>，'],
         ['zIndex',':number 必要时，手动配置z-index'],
         ['top',':number padding top,一般为了适配nav'],
         ['disClose',':boolean 取消关闭按钮'],
         ['width','定义宽度'],
         ['forceFix','强制使用fixed定位']
     ]
    },
    {title:'<var>Method</var>',
     body:[
         ['toggle()'],
         ['close()'],
         ['open()'],
         ['clear()','强行清除组件']
     ],
        count:2
    }

]
}