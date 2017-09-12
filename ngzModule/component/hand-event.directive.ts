import {Directive,Input,Output,EventEmitter,ElementRef} from '@angular/core';
import {ToolService} from '../tool/tool.service';
@Directive({
    selector:'[ngz-handEvent]',
    exportAs:'ngz-handEvent'
})
export class HandEventDirective{
    handEvent:any;
    destroy:any;
    @Input()withDrag:boolean;
    ngOnDestroy(){
        this.destroy();
    }
    listen:any=()=>{
        this.destroy=this.tool.slideEvents(this._el.nativeElement,this.withDrag,(states:any)=>{
            states.forEach((state:string)=>{
                (this as any)[state].emit();
            })
            this.direction.emit(states);
        })
    }
    @Output('direction')direction:EventEmitter<any>=new EventEmitter();
    @Output('handUp')up:EventEmitter<any>=new EventEmitter();
    @Output('handDown')down:EventEmitter<any>=new EventEmitter();
    @Output('handLeft')left:EventEmitter<any>=new EventEmitter();
    @Output('handRight')right:EventEmitter<any>=new EventEmitter();
    constructor(public tool:ToolService,private _el:ElementRef){
        this.listen();
    }
}