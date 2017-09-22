import {inheritMethod} from './method/method';

import {filterModel,initTypeDB} from './model';
import {DBOpts,CollectionOpts} from './config';

export class IndexDB{
    init:Function;
    use:Function;
    destroy:Function;
    db:any;

    constructor(dataName:string,opts:DBOpts){
        let publishV:number;
        const
            dynamicKey='_ngz_dynamicV_'+dataName,
            publishKey='_ngz_publishV_'+dataName,
            indexDB=(window as any).indexedDB,
            setVersion=(val:any,k=dynamicKey)=>localStorage[k]=val,
            getVersion=(k=dynamicKey)=>localStorage[k];
        this.destroy=(publishVersion:number)=>{
            indexDB.deleteDatabase(dataName);
            setVersion(1);
            publishV=setVersion(publishVersion,publishKey);
        };
        let compareVersion=()=>{
                const pubV=getVersion(publishKey),nowV=opts.publishVersion;
                if(!pubV||pubV!=nowV||!getVersion()){
                    this.destroy(nowV);
                }else{
                    publishV=nowV;
                }
            };
        compareVersion();
        let
        /*
        mainCollectionName='ngz_main',
        mainModel:any,
        models={},
        collections:any=[],
        */
        req:any,
        getModel=(modelName:string)=>this.db.transaction(modelName, 'readwrite').objectStore(modelName),
        createModel=(modelName:string,opts:CollectionOpts)=>{
          return new Promise(resolve=>{
            let newV=Number(getVersion())+1,objectStore:any;
            this.db.close();
            setTimeout(()=>{
              req=indexDB.open(dataName,newV);
              req.onupgradeneeded=(e:any)=>{
                this.db=req.result;
                objectStore=this.db.createObjectStore(modelName,{keyPath:opts.keyPath});
                setVersion(newV);
                filterModel(objectStore,opts);
              };
              req.onsuccess=()=>{
                this.db=req.result;
                resolve();
              }
            })
          })
        };
        this.init=()=>{
            return new Promise((resolve)=>{
                req=indexDB.open(dataName,getVersion());
                req.onupgradeneeded=(e:any)=>{
                    this.db=req.result;
                   // db.createObjectStore(mainCollectionName,{keyPath:'name'});
                };
                req.onsuccess=(e:any)=>{
                    this.db=req.result;
                    resolve();
                    /*
                    mainModel=getModel(mainCollectionName);
                    toCB(mainModel,'get','main',(err,data:any)=>{})
                    */
                };
            })
        };

        this.use=(collectionName:string,opts:CollectionOpts)=>{
            return new Promise(resolve=>{
                let
                modelOut:any={},
                initModel=()=>{
                  modelOut.__proto__=getModel(collectionName);
                  inheritMethod(modelOut,this,collectionName,opts);
                  modelOut=initTypeDB(modelOut,opts);
                  resolve(modelOut);
                };
                this.db.objectStoreNames.contains(collectionName)?initModel():createModel(collectionName,opts).then(initModel)
            })
        }
    }
}
