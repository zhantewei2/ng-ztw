export const cappedKey='_ngz_date';
export interface DBOpts{
    publishVersion:number;
}
export interface CollectionOpts{
    keyPath:string;
    type?:'capped'|'index'|any;
    limit?:number;
    index?:any;
}