export function limitStr(val:string,size:number){
    //cn size/2;
    //en size；
    let len=0,str='';
    size*=2;
    for(let i of val) {
        len += i.codePointAt(0).toString(16).length;
        if (len>size)break;
        str += i;
    }
    return str;
}