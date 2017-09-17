import {Pipe,PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
@Pipe({
    name: 'ngzTrust'
})
export class TrustPipe implements PipeTransform{
    constructor(private sanitizer:DomSanitizer){}
    transform(val:any,args?:any):string{
        args=args||'Html';
        const method='bypassSecurityTrust'+args[0].toUpperCase()+args.slice(1);
        return (this.sanitizer as any)[method].call(this.sanitizer,val);
    }
}