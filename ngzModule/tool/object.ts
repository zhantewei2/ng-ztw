export function isObject(val:any){
    return !(typeof val!='object'||val instanceof Array);
}