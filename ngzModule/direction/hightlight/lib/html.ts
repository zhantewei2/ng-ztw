import {lib,getGroup,_replace} from './libClass';
const  htmlAttr=(partStr:string)=>{
    const reg=/([^\s]+?(?=(\=|\s|$)))|((\'|\").+?('|\"))/g;
    return _replace(partStr,reg,(x:any)=>x.match(/\'|\"/)?lib.tagVal(x):lib.tagAttr(x))
}
export function hHtml(val:string){
    let reg=/&lt;.*?&gt;/g;
    const arr=getGroup(val,reg);
    let str='',endTagReg=/&lt;[^\/\s]+/,value,temp:any;
    for(let i=0,len=arr.length;i<len;i++){
        value=arr[i];
        if(i%2){
            if(temp=endTagReg.exec(value)){
                temp=temp.toString();
                if(temp.match('&gt;')){
                    str+=lib.tag(value);
                    //else attributes exists;
                }else{
                    const len=temp.length,len2='&gt;'.length;
                    str+=lib.tag(value.slice(0,len))+htmlAttr(value.slice(len,-len2))+lib.tag(value.slice(-len2));
                }
            }else{
                str+=lib.tag(value);
            }
        }else{str+=value}
    }
    return str;

}