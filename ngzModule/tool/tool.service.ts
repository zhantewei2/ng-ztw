import { Injectable } from '@angular/core';
import {NodeMethod}  from './node';
import {HandEvent} from './hand';
import {isObject} from './object';
import {Debounce} from './debounce';
@Injectable()
export class ToolService implements NodeMethod,HandEvent{
  constructor(){
    HandEvent.call(this);
    NodeMethod.call(this);
  }
  Debounce:any=Debounce;
  listenOnce:any;
  timerTool:any;
  addStyle:any;
  voidAnimate:any;
  moveEvent:any;
  slideEvents:any;
  isObject=isObject;
}
