import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import {ngzModule} from '@ng-ztw';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ModalComponent } from './modal/modal.component';
import { FontColorComponent } from './button/font-color/font-color.component';
import { FontSizeComponent} from './button/font-size/font-size.component';
import { HrefComponent } from './button/href/href.component';
import { ImageComponent } from './button/image/image.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ngzModule
  ],
  declarations: [
      TextEditorComponent, ModalComponent, FontColorComponent, FontSizeComponent, HrefComponent, ImageComponent
  ],
  exports:[TextEditorComponent]
})
export class ngzTextEditorModule { }
