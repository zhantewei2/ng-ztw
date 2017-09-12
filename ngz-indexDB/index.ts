import {inheritMethod} from './method/method';
import {toCB} from './util';
import {filterModel,initTypeDB} from './model';
import {DBOpts,CollectionOpts} from './config';

export class IndexDB{
    init:Function;
    use:Function;
    destroy:Function;
    db:any;
    constructor(dataName:string,opts:DBOpts){
        let publishV:number,locationV:number;
        const
            dynamicKey='_ngz_dynamicV_'+dataName,
            publishKey='_ngz_publishV_'+dataName,
            indexDB=(window as any).indexedDB,
            setVersion=(val:any,k=dynamicKey)=>localStorage[k]=val,
            getVersion=(k=dynamicKey)=>localStorage[k];
        this.destroy=(publishVersion:number)=>{
            indexDB.deleteDatabase(dataName);
            locationV=setVersion(1);
            publishV=setVersion(publishVersion,publishKey);
        };
        let compareVersion=()=>{
                const pubV=getVersion(publishKey),nowV=opts.publishVersion,locV=getVersion();
                if(!pubV||pubV!=nowV||!locV){
                    this.destroy(nowV);
                }else{
                    locationV=locV;
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
        getModel=(modelName:string)=>this.db.transaction(modelName,'readwrite').objectStore(modelName),
        createModel=(modelName:string,opts:CollectionOpts)=>{
            return new Promise(resolve=>{
                let newV=Number(locationV)+1,objectStore:any;
                this.db.close();
                setTimeout(()=>{
                    req=indexDB.open(dataName,newV);
                    req.onupgradeneeded=(e:any)=>{
                        this.db=req.result;
                        objectStore=this.db.createObjectStore(modelName,{keyPath:opts.keyPath});
                        filterModel(objectStore,opts);
                    };
                    req.onsuccess=()=>setVersion(newV)&&resolve();
                })
            })
        };
        this.init=()=>{
            return new Promise((resolve)=>{
                req=indexDB.open(dataName,locationV);
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
                model:any,
                initModel=()=>{
                  model=getModel(collectionName);
                  inheritMethod(model,this.db,collectionName,opts);
                  initTypeDB(model,opts);
                  resolve(model);
                },
                buildModel=()=>this.db.objectStoreNames.contains(collectionName)?initModel():createModel(collectionName,opts).then(initModel);
                !this.db?this.init().then(buildModel):buildModel();
            })
        }
    }
}