import {dbMethod} from './method';
import {toCB} from './util';
import {filterModel,appendType} from './model';
export function IndexDB(dataBase,opts){
  /*
    use example:
      let db=new IndexDB(dataBase,opts);
      db.init(()=>{
        db.use(collectionName,collectionOpts).then(model=>{})
      })
   ``````````````
   collectionOpts:{
      keyPath:
      type?: 'capped' || 'index' ||?
      limit:cappedLimitSize,
      index:indexFiled;
   }
   opts:{
   version:1,
   publishVersion:0,
   limitUsers:10,
   ? initColle undeveloped;
   }
   mainDocument:{users:[],normals:[]};
   */
  //version save in localstorage;
  const key='_ngz_dynamicV_'+dataBase,key2='_ngz_.publishV_'+dataBase;
  let indexDB=(window as any).indexedDB;
  let setVersion=(val,k=key)=>{
      localStorage[k]=val;
    },
    getVersion=(k=key)=>{
      return localStorage[k];
    };
  //compare publish version:
  (()=>{
    let pubV=getVersion(key2),nowV=opts.publishVersion;
    if(pubV&&pubV!=nowV){
      indexedDB.deleteDatabase(dataBase);
      setVersion(1);
    }
    setVersion(nowV,key2);
  })();

  let baseVersion=getVersion()||opts.version||1,
    limitUsers=opts.limitUsers||10,
    mainName='main',
    userModels={},
    models={},
    db,
    mainModel,
    mainObj:any={};


  let getModel=(modelName)=>{
    return db.transaction(modelName,'readwrite').objectStore(modelName);
  };

  //init:
  let init=(fn,create)=>{
    if(create){
      console.log('the '+dataBase+'version have from '+baseVersion+' changed to '+(++baseVersion));
      setVersion(baseVersion);
    }
    ((next)=>{
      if(db){
        db.close();
        setTimeout(next,1);
      }else{next()}
    })(()=>{
      let req=indexDB.open(dataBase,baseVersion);
      req.onsuccess=(e)=>{
        db=req.result;
        if(create)return fn();
        mainModel=getModel(mainName);
        toCB(mainModel,'get','main',(err,data)=>{
          let next=(data)=>{
            Object.assign(mainObj,data);fn();
          };
          if(!data){
            let obj={name:'main',users:[],normals:[]};
            toCB(mainModel,'add',obj,(err,data)=>{
              next(obj);
            })
          }else{
            next(data);
          }
        });
      };
      req.onupgradeneeded=(e)=>{
        db=req.result;
        let colles=db.objectStoreNames;
        if(create){
          create(colles);
        }else{
          if(!colles.contains(mainName))db.createObjectStore(mainName,{keyPath:'name'});
        }
      }
    })
  };
  //use model start:
  this.use=(modelName,opts,user:boolean=false)=>{
    return new Promise(resolve=>{
      ((cb)=>{
        let createIt=(colles)=>{
          if(!colles.contains(modelName)){
            let objectStore=db.createObjectStore(modelName,{keyPath:opts.keyPath});
            filterModel(objectStore,opts);
          }
        };
        let end=()=>{
          toCB(getModel(mainName),'put',mainObj,cb);
        };
        let users=mainObj.users,normals=mainObj.normals;
        if(user){
          if(users.includes(modelName))return cb();
          mainObj.users.push(modelName);
          if(mainObj.users.length>limitUsers) {
            let oldUser = mainObj.users.shift();
            let create=(colles)=>{
              db.deleteObjectStore(oldUser);
              createIt(colles);
            };
            init(end,create);
          }else{
            init(end,createIt);
          }
        }else{
          if(normals.includes(modelName))return cb();
          mainObj.normals.push(modelName);
          init(end,createIt);
        }
      })(()=>{
        let model=db.transaction(modelName,'readwrite').objectStore(modelName);
        dbMethod.call(model,db,modelName,opts.keyPath);
        let result=appendType(model,opts);
        if(result)model=result;
        resolve(model);
      })
    });
  };
  //use ---end;
  this.drop=(modalName)=>{
    return new Promise(resolve=>{
      let result=mainObj.users.findIndex(v=>v==modalName),
        pos='users';
      if(result<0){
        result=mainObj.normals.findIndex(v=>v==modalName);
        pos='normals';
      }
      if(result<0)return;
      let drop=()=>{
        db.deleteObjectStore(modalName);
        mainObj[pos].splice(result,1);
      };
      init(()=>{
        toCB(getModel(mainName),'put',mainObj,()=>{
          resolve()
        });
      },drop);
    })

  };
  this.destroy=()=>{
    localStorage[key]=undefined;
    localStorage[key2]=undefined;
    indexDB.deleteDatabase(dataBase);
  };
  this.init=init;
  this.mainObj=mainObj;
}
