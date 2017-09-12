export interface min_an_opts{
    node:any;
    start:any;
    end:any;
    endCb?:Function;
    startCb?:Function;
    timer?:number;
}
const addStyle=(node:any,style:any)=>{
    for(let i in style){
        node.style[i]=style[i]
    }
};
export class timerTool{
    timer:number;
    setT:any;
    constructor(timer:number){
        this.timer=timer;
    }
    next(fn:Function){
        this.setT=setTimeout(()=>{this.setT=null;fn()},this.timer);
    }
    finish(){
        if(this.setT){
            clearTimeout(this.setT);
            this.setT=null;
        }
    }
}
export class VoidAnimate{
    node:any;
    _state:string;
    start:any;
    end:any;
    endFn:any;
    timer:number;
    tmTool:timerTool;
    constructor(opts:min_an_opts){
        const node=this.node=opts.node;
        this.timer=opts.timer||300;
        this.start=opts.start;
        this.end=opts.end;
        this.tmTool=new timerTool(this.timer);
        this.endFn=()=>{
            node&&node.parentNode&&node.parentNode.removeChild(node);
            opts.endCb&&opts.endCb();
        };
        node.classList.add('animateNode');
    }
    endTimeOut:any;
    set state(val:string){
        this.tmTool.finish();
        if(val=='start'){
            addStyle(this.node,this.start);
            setTimeout(()=>{addStyle(this.node,this.end)},1);
        }else if(val=='end'){
            addStyle(this.node,this.start);
            this.tmTool.next(this.endFn);
        }
        this._state=val;
    }
}

export class NodeMethod{
    constructor(){}
    listenOnce=(node:any,event:any,cb:Function)=>{
        let once=()=>{
            cb();
            node.removeEventListener(event,once);
        };
        node.addEventListener(event,once);
    }
    timerTool:any=timerTool;
    addStyle:any=addStyle;
    voidAnimate:any=VoidAnimate;
}
