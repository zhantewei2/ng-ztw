ng-ztw  angular

Install
---
1. install 
```shell
 npm install ng-ztw --save
```
2. import main Module
```js
 import {ngzModule} from 'nz-ztw'

```
3. import it in your application module:
```js
import {ngzModule} from 'ng-ztw';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  imports :[ 
    ngzModules.forRoot(),
    BrowerAnimationsModule
    ]
})
```
4.include ng-ztw.css:
---
 path in  `ng-ztw/ng-ztw.min.css`;

Component List:
---

- collapse
- nav-side
- modal
- tooltip
- carousel
- min-modal
- footer-notice
- scroll
- tab
- slider
- menu
- pagination
- progree-bar

Direction List:
---
- col-show
- sticky
- clickCopy
- highlight
- ForIn
- handEvent
- handMove

Pipes:
---
- time
- limitStr



