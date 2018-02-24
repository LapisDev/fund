import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';

import { BackButtonComponent } from './back-button/back-button.component';
import { CloseButtonComponent } from './close-button/close-button.component';
import { MinimizeButtonComponent } from './minimize-button/minimize-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
  ],
  declarations: [
    BackButtonComponent,
    CloseButtonComponent,
    MinimizeButtonComponent
  ],
  exports: [
    BackButtonComponent,
    CloseButtonComponent,
    MinimizeButtonComponent
  ],
  providers: [],
})
export class SharedModule {
  
}