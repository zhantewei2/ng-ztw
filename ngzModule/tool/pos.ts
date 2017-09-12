export function getPos(node:any):any{
  const rect=node.getBoundingClientRect();
  return {
    left:Math.round(rect.left),
    top:Math.round(rect.top+window.pageYOffset+document.documentElement.clientTop),
    w:Math.round(rect.width),
    h:Math.round(rect.height)
  };
}
export function resizePos(pos:any,w:number):number{
  let dis;
  if(pos.left){
  dis=pos.left+w-window.innerWidth;
  if(dis>0){
    dis=dis+20;
    pos.left=pos.left-dis;
  }
  pos.left=pos.left<0?0:pos.left;
  }
  for(let i in pos){pos[i]+='px'};
  return dis;
}

export function tooltipPos(handleNode:any,tipNode:any,placement:any,isMid:boolean=true,space=6){
  const pos:any=getPos(handleNode),
      np:any={},
      body=document.querySelector('body'),
      w=tipNode.offsetWidth,
      h=tipNode.offsetHeight,
      newPos=(k1:any,val1:any,k2:any,val2:any)=>(np[k1]=Math.round(val1))&&(np[k2]=Math.round(val2)),
      retreat=(val:number)=>val+space;
  let  align:any=()=>{};
  if (isMid){
      align=(base:any,len:any,len2:any)=>base+len/2-len2/2;
  }else{
      align=(base:any)=>base;
  }
    switch(placement){
      case 'top':
        newPos('bottom',retreat(body.offsetHeight-pos.top),'left',align(pos.left,pos.w,w));
        break;
      case 'bottom':
        newPos('top',retreat(pos.top+pos.h+space),'left',align(pos.left,pos.w,w));
        break;
      case 'left':
        newPos('top',align(pos.top,pos.h,h),'right',retreat(body.offsetWidth-pos.left));
        break;
      case 'right':
        newPos('top',align(pos.top,pos.h,h),'left',retreat(pos.left+pos.w));
    }
    const dis=resizePos(np,w);
    return {pos:np,dis:dis};
}
export function transitionOrigin(p:string){
  return p=='top'?'0 100%':(p=='left'?'100% 0':'0 0');
}