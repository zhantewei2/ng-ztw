import {Component} from '@angular/core';
import {lib} from './lib';
import {Router,ActivatedRoute} from '@angular/router';
import {MainService} from '../../../main.service';
@Component({
    templateUrl:'./sticky.html'
})
export class StickyComponent{
    item:any;
    switch:string;
    lists:Array<string>=['sticky','clickCopy','highlight','ForIn','handEvent','handMove'];
    constructor(
        private route:ActivatedRoute,
        private router:Router,
        public main:MainService
    ){
        this.route.params.subscribe((params:any)=>{
            if(this.lists.find((item:string)=>item==params.id)){
                this.switch=params.id;
                this.item=lib[params.id];
                this.main.repairH();
            }else{
                this.router.navigate(['/']);
            }
        })
    }
    obj:any={
        item1:1,
        item2:2,
        item3:3
    };
    hand:any;
    pos:any;
}