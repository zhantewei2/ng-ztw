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



