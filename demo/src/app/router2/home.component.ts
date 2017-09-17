import {Component,ViewChild} from '@angular/core';
import {MainService} from '../main.service';
import {ActivatedRoute,Router} from '@angular/router';
@Component({
    templateUrl:'./home.html'
})
export class HomeComponent{
    name:string='ngzModule';
    selectComponent:any;
    selectList:any;
    @ViewChild('navTp')navTp:any;
    @ViewChild('navBar')navBar:any;
    constructor(
        public _main:MainService,
        private router:Router
    ){
        const url=router.routerState.snapshot.url;
        const name=url.split('/')[2];
        this.selectList=name=='Directive'||name=='Pipes'||name=='Expriment'?name:'Component';
    }
    ngAfterViewInit(){
        setTimeout(()=>this._main.navTp=this.navTp,1)
    }
    activate(){
        this._main.repairH();
    }
    componentList:Array<string>=[
        'collapse',
        'nav-side',
        'modal',
        'tooltip',
        'carousel',
        'min-modal',
        'footer-notice',
        'scroll',
        'tab',
        'slider',
        'menu',
        'pagination',
        'progress-bar'
    ];
    directiveList:Array<string>=[
        'col-show',
        'sticky',
        'clickCopy',
        'highlight',
        'ForIn',
        'handEvent',
        'handMove'
    ];
    pipeList:Array<string>=[
      'Pipes'
    ];
    expriment:Array<string>=[
        'text-editor',
        'indexDB'
    ]
    list:Array<any>=[
        {value:this.componentList,name:'Component'},
        {value:this.directiveList,name:'Directive',prefix:'Directive'},
        {value:this.pipeList,name:'Pipes'},
        {value:this.expriment,name:'Expriment',prefix:'Expriment'}
    ]
    selectCom(val:string){
        this.selectComponent=val;
    }
}