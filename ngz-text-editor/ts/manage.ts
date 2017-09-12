export function CheckHTML(html:string,limit:number,title:string,parent:any){
  if(html.length>limit){
    parent.modal.getResult(title+'超出最大字节','WARN',true);
    return false;
  }else if(!html.length){
    parent.modal.getResult(title+'不能为空','WARN',true);
    return false;
  }
  return html;
}
