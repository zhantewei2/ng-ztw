import {Observable} from 'rxjs'
import 'rxjs/add/observable/fromEvent';
const baseDis=80;
const moveEvent=(node:any,begin?:Function,cb?:Function,end?:any,withDrag?:boolean,noDis?:boolean)=>{
  node.classList.add('noSelect');
  let origin:any={},disX:number=0,disY:number=0,rect;
  const dis=(e:any)=>{
      rect=node.getBoundingClientRect();
      disX=e.pageX-rect.left;
      disY=e.pageY-rect.top-window.pageYOffset;
    },
    ori=(e:any,start?:boolean)=>{
      origin.x=Math.round(e.pageX-disX);
      origin.y=Math.round(e.pageY-disY);
      if(origin.x<0&&origin.y<0)return;
      return origin;
    },
    startOri=(e:any)=>{
      !noDis&&dis(e);
      ori(e)&&begin(origin)
    },
    moveOri=(e:any)=>ori(e)&&cb(origin);
  const subs:any={},
      clearSub=(params:any)=>{
        params.forEach((sub:any)=>{
            if(!subs[sub])return;
            subs[sub].unsubscribe();
            subs[sub]=null;
        });
      };
  const touchStartOb=Observable.fromEvent(node,'touchstart',false),
    touchMoveOb=Observable.fromEvent(node,'touchmove'),
    touchEndOb=Observable.fromEvent(node,'touchend');
    subs.touchStartSub=touchStartOb.subscribe((e:any)=>{
      startOri(e.targetTouches[0]);
      e.preventDefault()
    });
    subs.touchMoveSub=touchMoveOb.subscribe((e:any)=>{
      e.preventDefault();
      moveOri(e.targetTouches[0]);
    }),
    subs.touchEndSub=end&&touchEndOb.subscribe(end);
  let mouseUpSub:any,mouseMoveSub:any;
  const mouseMoveOb=Observable.fromEvent(document,'mousemove'),
      mouseUpOb=Observable.fromEvent(document,'mouseup'),
      mouseDownOb=Observable.fromEvent(node,'mousedown'),
      dragOb=Observable.fromEvent(document,'drag'),
      dragEndOb=Observable.fromEvent(document,'dragend');
  let i=0;
  const clearMouseSub=()=>clearSub(['mouseMoveSub','mouseUpSub','drag','dragEnd']);
  subs.mouseDownSub=mouseDownOb.subscribe((e:any)=>{
        startOri(e);
        //restore anomaly:
        clearMouseSub();
        const cancel=()=>{
              clearMouseSub();
              end&&end();
          }
        if(withDrag){
            subs.drag=dragOb.subscribe(moveOri);
            subs.dragEnd=dragEndOb.subscribe(cancel);
        }
        subs.mouseMoveSub=mouseMoveOb.subscribe(moveOri);
        subs.mouseUpSub=mouseUpOb.subscribe(cancel);
      });
  return ()=>{
    for(let i in subs){
      subs[i]&&subs[i].unsubscribe();
    }
  }
};
const slideEvents=(node:any,withDrag:boolean,cb:Function)=>{
  let x0:number,y0:number,x1:number,y1:number;
  return moveEvent(node,
  (e:any)=>{
      x0=e.x;
      y0=e.y;
  },
  (e:any)=>{
    x1=e.x;
    y1=e.y;
  },()=>{
    const states:Array<string>=[],disY=y1-y0,disX=x1-x0;
    if(disY>baseDis)states.push('down');
    if(0-disY>baseDis)states.push('up');
    if(disX>baseDis)states.push('right');
    if(0-disX>baseDis)states.push('left');
    x0=undefined;
    y0=undefined;
    cb(states);
  },withDrag,true);
};
export class HandEvent{
  moveEvent:any=moveEvent;
  slideEvents:any=slideEvents;
}