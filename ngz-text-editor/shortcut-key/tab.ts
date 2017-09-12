export function tabKey(mainNode:any){
  let findParent=(node:any):any=>{
    let parent:any=node.parentNode;
    if(!parent)return false;
    if(parent==mainNode)return node;
    return findParent(parent);
  };
  let findBlank=(str:string)=>{
    if(!str)return;
    let result=str.match(/^\s+/);
    if(!result)return false;
    return result.toString();
  };
  let getFocusNode=()=>{
    return window.getSelection().anchorNode;
  };
  let findNextDiv=(node:any):any=>{
    let next=node.nextElementSibling;
    if(!next)return null;
    if(next.nodeName=='DIV'&&next.parentNode==mainNode)return next;
    return findNextDiv(next);
  };
  let shiftPress:boolean=false;
  let handle=(e:any)=>{
    let key=e.key;
    if(key=='Tab'){
      e.preventDefault();
      document.execCommand('insertText',false,'  ');
    }
    if(key=='Enter'){
      let parent=findParent(getFocusNode());
      if(!parent)return;
      ((callback)=> {
        //shift+Enter combo  to break line;
        if (shiftPress) {
          e.preventDefault();
          let div = document.createElement('div'), next = findNextDiv(parent);
          div.innerText = 'a';
          !next ? mainNode.appendChild(div) : mainNode.insertBefore(div, next);
          setTimeout(() => {
            let range = window.getSelection().getRangeAt(0);
            range.setStart(div, 1);
            document.execCommand('delete');
            callback();
          }, 1)
        } else {
          callback();
        }
      })(()=>{
        // tab auto retract~!
        let blanks = parent.nodeName == '#text' ? findBlank(parent.nodeValue) : findBlank(parent.innerText);
        if (!blanks || blanks.length <= 1)return;
        setTimeout(() => {
          document.execCommand('insertText', false, blanks);
        }, 1)
      });
    }
    if(key=='Shift')shiftPress=true
  };

  let handleKeyup=(e:any)=>{
    let key=e.key;
    if(key=='Shift')shiftPress=false;
  };
  mainNode.addEventListener('keydown',handle);
  mainNode.addEventListener('keyup',handleKeyup);
}
