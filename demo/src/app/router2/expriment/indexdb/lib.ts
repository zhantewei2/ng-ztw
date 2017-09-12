export const lib={
    code1:`
import {IndexDB} from 'ztw-indexeddb'

const db=new IndexDB('dbName',{publishVersion:1})
db.use('collectionName',{keyPath:'name'}).then((collection:any)=>{
    collection.insert({name:'test',age:11},(err)=>{})
})
/*外部调用collection也是可以的: */
let articleColle:any;
let click=()=>articleColle.findOne('id_1',(err,data)=>{})；
db.use('collectionName2',{keyPath:'articleId'}).then((collection:any)=>{
    articleColle=collection
});
//外部调用，你要确保的是调用时，获取Collection的回调已经完成。

    `,
    api:[
        {title:'<var>Collection Options</var>',
        head:['db.use(collectionName,<var>CollectionOpts</var>)'],
        body:[
            ['keyPath','keyPath (必须指定)'],
            ['type?','"capped"|"index"'],
            ['limit?',":number type为capped时需要指定限制的大小,使collection成为一个capped collection"],
            ['index?',":any type为index时需要指定索引的field"]
        ]
        },
        {title:'<var>Collection Base Method</var>',
            body:[
                ['insert','insert(document,cb)','cb(err)'],
                ['findOne','findOne( key ,cb)','cb(err,data)'],
                ['findMany','findMany( Array< key> ,cb)','cb(err,data[])'],
                ['size','size(cb)','cb(err,count:number)'],
                ['upsert','upsert(key ,params ,cb)','不同于原版的put需要传入全部，这里params可以是局部参数'],
                ['purePut','purePut(params,cb)','不需要修改局部时使用，行为同put'],
                ['remove','remove(key,cb)','cb(err)'],
                ['useCursor<br>(opts,cb(err,cursor))',{
                    title:'opts',
                    content:[
                        {pre:'index',value:'CursorIndex'},
                        {pre:'query?',value:'key or IDBKeyRange'},
                        {pre:'direction?',value:'cursor direction'}
                    ]
                }],
                ['genKey','将一个Object转为key，在db中你不可能用map直接将obj作为一个key,genKey生成一个比JSON方法要小一些的key'],
                ['collection可以直接调用原生方法，它是继承自objectStore的']
            ],
            count:3
        },
        {title:'<var>Index Collection Methed</var>',
            body:[
                ['带索引的集合拥有的方法（capped内部添加了索引）'],
                ['getList():Promise',{
                    title:'arguments',
                    content:[
                        {pre:'size:number',value:'获取的数量'},
                        {pre:'select?:[]',value:'相当于 projection'},
                        {pre:'index?:any=cappedKey',value:'默认为capped的key,capped没有必要指定后面三个参数'},
                        'direction?:string="next"',
                        'query?:any'
                    ]
                }]
            ],
            count:2
        }
    ]
}