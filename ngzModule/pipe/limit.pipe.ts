import { Pipe, PipeTransform } from '@angular/core';
import {limitStr} from '../tool/validate';
@Pipe({
  name: 'ngzLimitStr'
})
export class LimitPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if(!value)return '';
    let str=limitStr(value,args||16);
    if(value!=str)str+='...';
    return str;
  }
}
