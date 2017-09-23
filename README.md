### ng-ztw
### [Visit ng-ztw DEMO](https://zhantewei2.github.io/ng-ztw/) 
Angular components

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
4. import css:
```js
import 'ng-ztw/ngz.min.css'

```


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



