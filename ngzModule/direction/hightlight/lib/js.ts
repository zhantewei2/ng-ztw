import {lib,getGroup,_replace} from './libClass';
const _function=(str:string)=>_replace(str,/\b(function|constructor|while|for|if|else|switch)\b/g,(x:string)=>lib.jsFn(x));
const _variables=(str:string)=>_replace(str,/\b(const|var|let|private|public|:\w+)\b/g,(x:string)=>lib.jsVar(x));
//.log | example(param)
const _property=(str:string)=>_replace(str,/(\.\w+\b)|\w+(?=\(.*?\))/g,(x:string)=>lib.jsProperty(x))
const _special=(str:string)=>_replace(str,/\b(require|export|import|return|interface|from|break|case|set|get|extends)\b/g,(x:string)=>lib.jsSpecial(x));

export function hJs(val:string){
    const groupReg=/(?:(\'|\").*?\1)|(\/\*[^]*?\*\/)|(\/\/.*)/g;
    const arr=getGroup(val,groupReg);
    let str='';
    arr.forEach((v:string,index:number)=>{
       if(!(index%2)){
           v=_variables(v);
           v=_function(v);
           v=_property(v);
           v=_special(v);
       }else if(v.match(/^\/\//)){
           v=lib.jsComment(v);
       }else if(v.match(/^\/\*/)){
           v=_replace(v,/<td>/g,(x:string)=>'<td class="zl-cmt">');
           v=lib.jsComment(v);
       }
       str+=v;
    });

    return str;
}