export const lib:any={
    code2:`
<span *ngFor="let color of main.allColors2" class="my-2 alert-{{color}} hazy-{{color}}">
This class is
<b>alert-{{color}}</b>
<b>hazy-{{color}}</b>
</span>
`,
code1:`
<span *ngFor="let color of main.allColors2" class="my-2 alert-{{color}}" >
This class is <em class="b-{{color}}">alert-{{color}}</em>
</span>
`,
    code3:`<span class="alert-d">
Alert close
<span class="close">&times;</span>
</span>
    `
};