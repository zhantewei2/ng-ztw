export class FilterHTML{
  filter(html:string){
    html=html.replace(/\n|\r/g,'');
    let allArr:Array<any>=[],regExp=/<[^\/].*?>/g,result,str='';
    let getAll=()=>{
      result=regExp.exec(html);
      if(!result)return;
      allArr.push([
        result.index,
        regExp.lastIndex,
        result.toString().replace(/style=".*?"|rel=".*?"|id=".*?"|class=".*?"|data-.*?=".*?|\<!--[^]*?--\>"/g,'')
      ]);
      getAll();
    };
    getAll();
    for(let i=0,len=allArr.length;i<len;i++){
      str+=i==0?html.slice(0,allArr[0][0])+allArr[0][2]:html.slice(allArr[i-1][1],allArr[i][0])+allArr[i][2];
      if(i+1==len)str+=html.slice(allArr[i][1],html.length);
    }
    return str;
  }

}
