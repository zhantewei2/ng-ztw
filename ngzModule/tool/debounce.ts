export class Debounce{
    timeout:any;
    run:Function;
    constructor(t:number){
      this.run=(fn:Function)=> {
          if (this.timeout) {
              clearTimeout(this.timeout);
          }
          this.timeout=setTimeout(() => {
              fn();
              this.timeout=null;
          }, t);
      }
    }
}
export const debounce=(cb:Function,t:number=1000)=>{
    let db=new Debounce(t);
    return (e:any)=>{
        db.run(()=>cb(e));
    }
}
