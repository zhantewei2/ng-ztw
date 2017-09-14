export const code:string=`
<div *ngFor="let table of tableArr">
    <p><span class="quote-sign-p sign-sm color-wt">{{table||'table'}}</span></p>
    <table class="table {{table}}">
        <thead>
            <tr>
                <th>#</th>
                <th *ngFor="let td of tdArr;index as index">{{index+1}}</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let tr of trArr;index as index">
                <th scope="row">{{index+1}}</th>
                <td *ngFor="let td of tdArr">{{td}}</td>
            </tr>
        </tbody>
    </table>
    <p>class=<var>"table {{table}}"</var></p>
</div>
`
export const code2:string=`
tdArr:any=['td1','td2','td3']
trArr:any=[1,2,3]
tableArr:any=['','table-stripe','table-inverse','table-stripe table-inverse']
`;