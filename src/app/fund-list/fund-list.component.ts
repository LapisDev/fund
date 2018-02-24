import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/concat';

import {
  FundDataService, FundDetail, FundSummary,
  FundCalulatorService, FundStorageService
} from '../services/fund';

@Component({
  selector: 'fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.css']
})
export class FundListComponent implements OnInit, OnDestroy {

  constructor(
    private fundStorageService: FundStorageService,
    private fundDataService: FundDataService,
    private fundCalulatorService: FundCalulatorService
  ) { }

  private fundSummaryList: FundSummary[];

  private timer: Observable<number>;
  private subscription: Subscription;

  ngOnInit() {
    this.getFundSummaryList();
    this.initTimer();    
  }

  ngOnDestroy() {
    this.destroyTimer();
  }

  getFundSummaryList() {
    let codeList = this.fundStorageService.getFundInfoList()
      .map(item => item.code);
    let fundSummaryList = [];
    Observable.concat(...codeList.map(code => this.fundDataService.getFundSummary(code)))
      .subscribe(
      fundSummary => {
        fundSummaryList.push(fundSummary);
        if (!this.fundSummaryList ||
          fundSummaryList.length == codeList.length ||          
          fundSummaryList.length >= this.fundSummaryList.length) {
          this.fundSummaryList = fundSummaryList
        }
      },
      error => console.log(error)
      );
  }

  initTimer() {
    this.timer = Observable.timer(300000, 300000);
    this.subscription = this.timer.subscribe(t => this.getFundSummaryList());
  }

  destroyTimer() {
    this.subscription.unsubscribe();
  }

}
