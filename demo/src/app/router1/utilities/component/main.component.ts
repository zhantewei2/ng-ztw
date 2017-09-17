import {Component,ViewChild,ViewChildren} from '@angular/core';
import {RouterOneService} from '../../service/router1.service';
import {Router,ActivatedRoute} from '@angular/router';
import {FragItemComponent} from './frag-item.component';
import {MainService} from '../../../main.service';
import {PositionService} from 'ng-ztw';
@Component({
    templateUrl:'./main.html'
})
export class MainComponent{
    constructor(
        public _rs:RouterOneService,
        private router:Router,
        private route:ActivatedRoute,
        public main:MainService,
        public _pos:PositionService
    ){}
    navName:string='utilMain';
    @ViewChild('navTp')navTp:any;
    @ViewChild('scroll')scroll:any;
    @ViewChildren(FragItemComponent)frags:Array<FragItemComponent>;
    ngOnInit(){
        setTimeout(()=>this._rs.utilTp=this.navTp);
    }
    ngAfterViewInit(){
        const fg=this.route.snapshot.fragment;
        this.fragList=this.frags.map((v:any,index:number)=>{
            v.navTo=()=>this.scrollValue=v.frag;
            if(v.frag===fg){
                const top=this._pos.getPos(v._el.nativeElement).top-60;
                setTimeout(()=>window.scrollTo(0,top<0?0:top));
            }
            return v.frag
        });

    }
    fragList:Array<string>;
    _scrollValue:any;
    set scrollValue(val:any){
        this._scrollValue=val;
        if(!val)return;
        this.router.navigate(['./'],{relativeTo:this.route,fragment:val.toString()})
    }
    get scrollValue(){
        return this._scrollValue;
    }

    space={
        head:['all','x','y','left','right','top','bottom'],
        pos:['','x','y','l','r','t','b']
    };
    flex={
        cg:[
            ['flex','display:flex'],
            ['flex-fluid | flex-wrap','流动的flex'],
            ['center','垂直水平居中的flex'],
            ['around','around对齐的flex'],
            ['between','between对齐的flex'],
            ['column','flow为column的flex'],
            ['center-column','flow为column且水平垂直居中的flex'],
            ['flex-1','flex的子元素,flex:1']
        ]
    };
    pos={
        abs:[
            ['abs','display:absolute'],
            ['abs-tl','top left abs 左上角的abs，存在一定距离'],
            ['abs-tr','top right abs'],
            ['abs-bl','bottom left abs'],
            ['abs-br','bottom right abs'],
            ['abs-tl-0','距离为0的abs-tl,其余三个同样'],
            ['abs-center','垂直水平居中的abs'],
            ['abs-mid','水平居中的abs'],
            ['abs-top','固定居上的abs']
        ],
        some:[
            ['full','width:100%;height:100%'],
            ['rel','position:relative'],
            ['sticky','position:sticky'],
            ['sticky-top','top为0的sticky'],
            ['fix-top','top:0 的fixed'],
            ['fix-center','垂直水平居中的fixed'],
            ['fix-bottom','bottom:0 的fixed'],
            ['block','display:block'],
            ['inline-d','display:inline-block'],
            ['text-center','文本居中'],
            ['text-left','文本左对齐'],
            ['text-right','文本右对齐'],
            ['auto','overflow:auto']
        ]
    };
    other={
      main:[
          ['hid','visibility:hidden'],
          ['show','visible,比如用来显示dropdown'],
          ['close','关闭按钮'],
          ['animateNode','添加transition all'],
          ['noSelect','禁止选择'],
          ['article','段落格式，首行空两格'],
          ['inverse','反转background color和font color'],
          ['<hr>','分割线'],
          ['scroll-appearance','为滚动条添加皮肤，仅在webkit下有效']
      ]
    };

}