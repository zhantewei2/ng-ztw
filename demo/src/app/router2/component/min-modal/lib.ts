export const lib={
  code1:`<button *ngFor="let i of main.allColors2" class="m-3 btn btn-{{i}}" (click)="modalValue=i;modalType=i">{{i}}</button>
<ngz-min-modal [(ngModel)]="modalValue" [type]="modalType"></ngz-min-modal>
  `,
  code2:``
};