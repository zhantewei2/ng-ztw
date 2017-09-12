import {trigger,state,style,transition,animate,keyframes} from '@angular/animations';
let t='0.3s ease',tOut='0.15s ease-out'

export function modal(style1={transform:'translateY(-100%)',opacity:.5}):any{
  return trigger('DownModal',[
      state('hid',style({display:'none'})),
      transition('show=>hid',[animate(tOut,style(style1))]),
      transition('hid=>show',[style(style1),animate(t)])
  ])
}
export function fade(style1={opacity:0}):any{
  return trigger('Fade',[
      state('hid',style({display:'none'})),
      transition('show=>hid',[animate(tOut,style(style1))]),
      transition('hid=>show',[style(style1),animate(t)])
  ])
}


