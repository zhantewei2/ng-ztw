import {Component,ViewChild} from '@angular/core';

@Component({
    templateUrl:'./input.html'
})
export class InputComponent{
    @ViewChild('div2')div2:any;
    ngAfterViewInit(){
        const node=this.div2.nativeElement;
        const child1=node.childNodes[0];
        console.log(child1.nodeName)
}
}