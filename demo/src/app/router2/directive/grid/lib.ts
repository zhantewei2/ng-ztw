export const lib:any= {code1:`
<div class="row" style="height:200px;">
    <div class="col-2 bg-d center">col-2</div>
    <div class="col bg-p center" *ngz-col-show="'!md'">col-hidden-md</div>
    <div class="col-8 bg-i center" *ngz-col-show="'!lg'">col-hidden-gt-lg</div>
    <div class="col bg-w center" *ngz-col-show="'lg'">col-show-gt-lg</div>
</div>
`}