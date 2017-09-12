const insert=(val:string,s:string)=>`<a class="${s}">${val}</a>`;

export function getGroup(str:string,reg:RegExp):Array<string>{
  let result,preIndex=0,arr=[];
  while(result=reg.exec(str)){
    arr.push(str.slice(preIndex,result.index));
    arr.push(result[0]);
    preIndex=reg.lastIndex;
  }
  arr.push(str.slice(preIndex));
  return arr;
}
export function _replace(str:string,reg:RegExp,cb:any):string{
  str=str.replace(reg,cb);
  return str;
}

export const lib={
  tag:(val:string)=>insert(val,'zl-tag'),
  tagAttr:(val:string)=>insert(val,'zl-tAttr'),
  tagVal:(val:string)=>insert(val,'zl-tVal'),
  jsFn:(val:string)=>insert(val,'zl-fn'),
  jsVar:(val:string)=>insert(val,'zl-var'),
  jsProperty:(val:string)=>insert(val,'zl-pt'),
  jsSpecial:(val:string)=>insert(val,'zl-sp'),
  jsComment:(val:string)=>insert(val,'zl-cmt')
};