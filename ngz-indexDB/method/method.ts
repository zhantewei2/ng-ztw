import {toCB,asyncForEach} from '../util';
import {CollectionOpts} from '../config';

export function dbMethod(parentObj:any,modelName:string,keyPath:string){
  const tryToCB=(model:any,method:string,params:any,cb:Function)=>{
    try{
      toCB(model,method,params,cb);
    }catch(err){
      try {
        model.__proto__= parentObj.db.transaction(modelName, 'readwrite').objectStore(modelName);
        toCB(model, method, params, cb);
      }catch(e){
        console.log('handle error')
      }
    }
  };
  this.removeAll=(cb:Function)=>tryToCB(this,'clear',null,cb);

  this.size=(cb:Function)=>tryToCB(this,'count',null,cb);

  this.insert=(params:any,cb:Function)=>tryToCB(this,'add',params,cb);

  this.remove=(key:string,cb:Function)=>tryToCB(this,'delete',key,cb);

  this.findOne=(key:string,cb:Function)=>tryToCB(this,'get',key,cb);

  this.upsert=(key:string,params:any,cb:Function)=>{
    this.findOne(key,(err:any,data:any)=>{
      if(!data)data={};
      params[keyPath]=key;
      Object.assign(data,params);
      tryToCB(this,'put',data,cb);
    })
  };
  this.purePut=(params:any,cb:Function)=>{
    tryToCB(this,'put',params,cb);
  };
  this.useCursor=(opts:any,cb:Function)=>{
    /* opts:{index: query: direction: }*/
    let method=(model:any)=>{
      let cursorI=model.index(opts.index);
      let req=cursorI.openCursor(opts.query,opts.direction);
        req.onsuccess=(e:any)=>cb(null,e.target.result);
        req.onerror=(e:any)=>cb(e.target.result,null);
    };
    try{
      method(this)
    }catch(e){
      let objStore=parentObj.db.transaction(modelName,'readwrite').objectStore(modelName);
      method(objStore);
    }
  };
  this.findMany=(keys:Array<string>,cb:Function)=>{
    let results:any=[];
    asyncForEach(
      keys,
      (val:any,next:Function)=>{
        this.findOne(val,(err:any,data:any)=>{
          if(err){
            cb(err,null);
            next('out');
          }
          results.push(data);
          next();
        })
      },
      ()=>{
        cb(null,results);
      }
    );
  };
  this.genKey=(obj:any)=>{
    let key='';
    for(let i in obj){
      key+=i+'_'+obj[i]+',';
    }
    return key.slice(0,-1);
  }
}
export function inheritMethod(modelOut:any,parentObj:any,modelName:string,opts:CollectionOpts){
  dbMethod.call(modelOut,parentObj,modelName,opts.keyPath);

}
