import {trigger,transition,style,animate,state,keyframes,query,animateChild} from '@angular/animations';
let defaultT='.3s ease-out';

export function carousel(
    t:string='.3s ease',
    style1:any={transform:'translateX(-100%)'},
    style2:any={transform:'translateX(100%)'},
    style3:any={position:'absolute',width:'*',top:0,left:0}
    ):any{
    return trigger('Carousel',[
        transition('left=>void',[style(style3), animate(t,style(style1))]),
        transition('void=>left',[style(style1),animate(t)]),
        transition('right=>void',[style(style3), animate(t,style(style2))]),
        transition('void=>right',[style(style2),animate(t)])
    ])
}
export function menu(
    t:string='.2s ease-out',
    style1:any={transform:'scale(.1,.1)',opacity:0}
    ):any{
    return trigger('Menu',[
        transition('*=>show',[style(style1),animate(t)]),
        transition('show=>hid',[animate(t,style({opacity:0}))])
    ])
}
export function horizonRight(
    t:string='.1s ease',
    style1:any={transform:'translateX(100%)',display:'none'}
    ):any{
    return trigger('HorizonRight',[
        state('hid',style(style1)),
        transition('*=>*',[animate(t)])
    ])
}
export function verticalUp(
    t:string=defaultT,
    style1:any={transform:'translateY(100%)'}
    ):any{
    return trigger('VerticalUp',[
        transition('void=>*',[style(style1),animate(t)]),
        transition('*=>void',[animate(t,style(style1))])
    ])
}

export function collapse(
    t:string='.2s ease-out',
    style1:any={height:0}
):any{
    return trigger('Collapse',[
        transition('show=>void',[animate(t,style(style1))]),
        transition('void=>show',[style(style1),animate(t)])
    ])
}
export function fade(t:string=defaultT,style1:any={opacity:0}):any{
    return trigger('Fade',[
        transition('*=>void',[animate(t,style(style1))]),
        transition('void=>*',[style(style1),animate(t)])
        ])
}
export function sideRight(
    t:string=defaultT,
    style1:any={transform:'translateX(-100%)'}):any{
    return trigger('SideRight',[
        transition('*=>void',[animate(t,style(style1))]),
        transition('void=>*',[style(style1),animate(t)])
    ])
}
export function modal(
    t:string=defaultT,
    t2:string='.2s ease'
):any{
    return trigger('Modal',[
        transition('*=>void',[animate(t2,style({opacity:0,top:'-10%'}))]),
        transition('void=>*',[style({top:'0%',opacity:.5}),animate(t)])
    ])
}
export function pop(
    t1:string=defaultT,
    t2:string='.2s ease'
):any{
    return trigger('Pop',[
        transition('void=>*',[animate(t1,keyframes([
            style({opacity:0,transform:'scale(.7,.7)',offset:0}),
            style({opacity:1,transform:'scale(1.2,1.2)',offset:0.8}),
            style({transform:'scale(1,1)',offset:1})
        ]))]),
        transition('*=>void',[animate(t2,style({opacity:0,transform:'translateY(-40%)'}))])
    ])
}
