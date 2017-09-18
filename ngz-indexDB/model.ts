import {CollectionOpts,cappedKey} from './config';
import {indexMethod} from './method/indexMethod';

export function initTypeDB(model:any,opts:CollectionOpts){
  if(!opts.type)return model;
  indexMethod.call(model);
  if(opts.type=='capped'){
    let model2:any={};
    model2.__proto__=model;
    model2.cappedLimit=opts.limit;
    model2['insert']=(params:any,cb:Function)=>{
      params[cappedKey]=new Date().getTime();
      model.size((err:any,size:number)=>{
        ((next)=> {
          if (size>=model2.cappedLimit){
            model.useCursor(cappedKey,(err:any,cursor:any)=>{
              model.remove(cursor['value'][model.keyPath],(err:any,data:any)=>next())
            });
          }else{next()}
        })(()=>model.insert(params,cb))
      })
    };
    return model2
  }
  return model;
}

export function filterModel(objectStore:any,opts:CollectionOpts){
  if(!opts.type)return;
  if(opts.type=='capped'&&opts.limit){
      objectStore.createIndex(cappedKey,cappedKey,{unique:true});

  }else if(opts.type=='index'&&opts.index){
      objectStore.createIndex(opts.index,opts.index,{unique:true});
  }
}

