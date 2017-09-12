export const lib:any={
    code1:`
<div>
    <ngz-text-editor #textEditor style="min-height:400px;"></ngz-text-editor>
</div>
<div class="px-2 my-1">
    <button class="btn btn-l" (click)="result=textEditor.getHTML() ; disResult=false">Submit</button>
    <button class="btn btn-l mx-1" (click)="textEditor.clearTxt1() ; disResult=true">Clear</button>
</div>
<div class="card block" *ngIf="result&&!disResult">
    <header class="modal-header bg-w">
        获取内容：
        <span class="close" (click)="disResult=true">&times;</span>
    </header>
    <article class="card-content" [innerHTML]="result"></article>
</div>`
}