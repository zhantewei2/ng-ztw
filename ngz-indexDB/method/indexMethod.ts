import {cappedKey} from '../config';

export class indexMethod{
    getList:Function;
    constructor(){
        this.getList=(size:number,select:any,index:any=cappedKey,direction='next',query:any=null)=>{
            return new Promise(resolve=>{
                let results:any=[];
                (this as any).useCursor({index:index,direction:direction,query:query},(err:any,cursor:any)=>{
                    if(cursor&&size--){
                        if(select&&select.length){
                            let obj:any={};
                            select.forEach((v:any)=>{
                                obj[v]=cursor.value[v];
                            });
                            results.push(obj);
                        }else{
                            results.push(cursor.value);
                        }
                        cursor.continue();
                    }else{
                        resolve(results);
                    }
                })
            })
        }
    }
}
