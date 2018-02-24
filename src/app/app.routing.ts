import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundDetailComponent } from './fund-detail/fund-detail.component';
import { FundListComponent } from './fund-list/fund-list.component';
import { AddFundComponent } from './add-fund/add-fund.component';

export const appRoutes: Routes = [
  { path: '', component: FundListComponent },
  { path: 'detail/:code', component: FundDetailComponent },
  { path: 'add', component: AddFundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}