import {Component} from '@angular/core'
@Component({
    templateUrl:'./home.html'
})
export class MainHomeComponet {
    obj: any = {a: 1, b: 2};
    ngAfterViewInit(){
        window.scrollTo(0,0);
    }
    steps: Array<any>=[
        {title:'安装',
        content:`
npm install ng-ztw --save`
        },
        {title:'import ngzModule',
        content:`
import {ngzModule} from 'ng-ztw';
improt {BrowserAnimationsModule} from '..';
@NgModule({
    imports:[
        ngzModules.forRoot();
        BrowserAnimationsModule
    ]
})
        `
        },
        {title:'import ngzCss',
         content:'import "ng-ztw/ngz.min.css"'
        }

    ]
}