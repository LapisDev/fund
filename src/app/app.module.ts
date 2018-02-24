import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule, MatToolbarModule, MatCardModule,
  MatChipsModule, MatExpansionModule, MatListModule,
  MatInputModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViserModule } from 'viser-ng';

import { SharedModule } from './shared/shared.module';
import { FundDataService, FundCalulatorService, FundStorageService } from './services/fund';
import { AppComponent } from './app.component';
import { FundChartComponent } from './fund-chart/fund-chart.component';
import { FundDetailComponent } from './fund-detail/fund-detail.component';
import { FundListComponent } from './fund-list/fund-list.component';
import { AddFundComponent } from './add-fund/add-fund.component';

@NgModule({
  declarations: [
    AppComponent,
    FundChartComponent,
    FundDetailComponent,
    FundListComponent,
    AddFundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ViserModule
  ],
  providers: [
    FundDataService, 
    FundCalulatorService, 
    FundStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
