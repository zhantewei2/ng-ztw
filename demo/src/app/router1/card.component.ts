import {Component} from '@angular/core';

@Component({
    templateUrl:'./card.html'
})
export class CardComponent{
    cardArr:Array<any>=[
        'http://desk.fd.zol-img.com.cn/t_s1024x768c5/g5/M00/02/08/ChMkJlbKzRuIZTwYAA8RdRCJXWoAALI9QBiB6wADxGN335.jpg',
        'http://desk.fd.zol-img.com.cn/t_s1024x768c5/g5/M00/02/08/ChMkJ1bKzR6Id3THABn5IayQLYgAALI9QHWgQcAGfk5886.jpg',
        'http://desk.fd.zol-img.com.cn/t_s1024x768c5/g5/M00/02/08/ChMkJ1bKzR2ILZfPAA5RKk7mmS4AALI9QEXOsgADlFC731.jpg'];
    code=`
<div style="width:300px;" class="card" *ngFor="let i of cardArr">
    <img class="card-img" [src]="i">
    <div class="card-header">
        card-header
    </div>
    <div class="card-content">
        Taylor Swift,  card-content
    </div>
    <div class='card-footer between'>
        <button class="btn btn-sm btn-l">cancel</button>
        <button class="btn btn-sm btn-d">entry</button>
    </div>
</div>
    `
}