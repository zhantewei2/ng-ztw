import {Component} from '@angular/core';

@Component({
    templateUrl:'./dropdown.html'
})
export class DropdownComponent{
    btnArr:Array<any>=[
        {isShow:false,dr:'bottom'},
        {isShow:false,dr:'top'},
        {isShow:false,dr:'left'},
        {isShow:false,dr:'right'}
    ];
    show(node:any,i:any){
        i.isShow?this.close(node,i):this.open(node,i);
        let click=()=>{
            document.removeEventListener('click',click);
        }
        document.addEventListener('click',click);
    }
    close=(node:any,i:any)=>{
        i.isShow=false;
        node.classList.remove('show')
    }
    open=(node:any,i:any)=>{
        i.isShow=true;
        node.classList.add('show');
    }
    menuList:Array<string>=[
        'list1',
        'list2',
        'list3',
        'list4'
    ]
    showList:boolean;
    listSelect:any;
}