export const lib={
    code1:`<ngz-modal #modal [content]="content" ></ngz-modal>
<button (click)="content=_content1;modal.open()" class="btn0 btn-o-d">Lg Modal</button>{{result1}}
<button (click)="content={content:'Example',type:'s'};modal.open()" class="btn0 btn-o-s">s Modal</button>
<button (click)="content={content:'Example'};modal.open()" class="btn btn-l">pure Modal</button>
<button (click)="content={content:tp1,type:'p',title:'innert Template',btn:null};modal.open()"  class="btn btn-p">Template Modal</button>
<ng-template #tp1>
    <p>
        <b class="color-p">account</b>
        <input class="form-c" placeholder="Input Name"/>
    </p>
    <p>
        <b class="color-p">password</b>
        <input class="form-c" placeholder="password"/>
    </p>
    <p >
        <button (click)="modal.close()" class="btn btn-p mx-2">LOGIN</button>
        <button (click)="modal.close()" class="btn btn-p">CANCEL</button>
    </p>
</ng-template>
    `,
    code2:`
result1:boolean;
_content1:any={
    content:'Example lg-modal',
    btn:'double',
    type:'d',
    lg:true,
    title:'I am tiltle',
    cb:(e:boolean)=>this.result1=e
};`,
    api:
    [
    {title:'<var>@Input Content Opts</var>',
     body:[
         ['content',':string|TemplateRef<any>','可以传入字符串也可以是TemplateRef '],
         ['title?',':string','modal tiitle'],
         ['btn?',':"double"|"single（default）"|null',"为null时,将没有footer"],
         ['type?',':string'],
         ['lg?',':boolean false(default)',"配置大小"],
         ['cb?(result:boolean)','如果btn =="double",result将返回用户的选择']
     ],
        count:3
    }
    ],
    api2:
    [{
        title:'<var>Method</var>',
        body:[['open()'],['close()']]
    }]

}