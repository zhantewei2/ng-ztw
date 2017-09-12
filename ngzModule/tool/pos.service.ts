import { Injectable } from '@angular/core';
import {getPos,resizePos,tooltipPos,transitionOrigin} from './pos';
export interface MoveAnimateParams{
    x1:number;
    x0:number;
    t?:number;
    vt?:number;
    timing?:'out'|'in'|'ease';
}

@Injectable()
export class PositionService{
    _origin=transitionOrigin;
    getPos=getPos;
    resizePos=resizePos;
    tooltipPos=tooltipPos;
    posToRel=(node:any)=>{
        const position=node.style.position||window.getComputedStyle(node,null).position;
        if(!position.match(/relative|absolute|flex/))node.style.position='relative';
    }

    moveAnimate=(params:MoveAnimateParams,cb:Function,end?:Function)=>{
        let x1=params.x1,
            x0=params.x0,
            t=params.t||300,
            vt=params.vt||10,
            timing=params.timing;
        const runFn=(s:number,isOut:boolean,cbFn:Function,endFn?:Function)=>{
            let pt=t/vt,a=s*2/(pt*pt),passT=0;
            if(s==0)return;
            let getS=isOut?()=>a*pt*passT-a*passT*passT*0.5:()=>a*passT*passT*0.5;
            let moveInterval=setInterval(()=>{
                passT++;
                cbFn(getS());
                if(passT>=pt){
                    clearInterval(moveInterval);
                    endFn&&endFn();
                }
            },vt);
        };
        if(timing=='out'){
            runFn(x1-x0,true,cb,end);
        }else if(timing=='in') {
            runFn(x1-x0,false,cb,end);
        }else{
            let midX=(x1-x0)/2;
            t*=0.5;
            runFn(midX,false,cb,()=>{
                runFn(midX,true,(n:number)=>cb(n+midX),end);
            })
        }
    }
}