import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx';

import {
  FundDataService, FundDetail, FundSummary,
  FundCalulatorService, FundStorageService, FundInfo
} from '../services/fund';

@Component({
  selector: 'fund-detail',
  templateUrl: './fund-detail.component.html',
  styleUrls: ['./fund-detail.component.css']
})
export class FundDetailComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private fundStorageService: FundStorageService,
    private fundDataService: FundDataService,
    private fundCalulatorService: FundCalulatorService
  ) { }

  private fundDetail: FundDetail;
  private fundSummary: FundSummary;
  private fundState: boolean;

  private timer: Observable<number>;
  private subscription: Subscription;

  ngOnInit() {
    this.updateFundState();
    this.getFundSummary();
    this.getFundDetail();
    this.initTimer();
  }

  ngOnDestroy() {
    this.destroyTimer();
  }

  updateFundState() {
    const code = this.route.snapshot.paramMap.get('code');
    this.fundState = this.fundStorageService.hasFundInfo(code);
  }

  getFundSummary() {
    const code = this.route.snapshot.paramMap.get('code');
    this.fundDataService.getFundSummary(code)
      .subscribe(
      fundSummary => this.fundSummary = fundSummary,
      error => console.log(error)
      );
  }

  getFundDetail() {
    const code = this.route.snapshot.paramMap.get('code');
    this.fundDataService.getFundDetail(code)
      .subscribe(
      fundDetail => {
        [5, 10, 30, 60, 120, 250].forEach(days => 
          fundDetail = this.fundCalulatorService.calculateAverage(fundDetail, days)
        );
        this.fundDetail = fundDetail;
      },
      error => console.log(error)
      );
  }

  removeFund() {
    if (this.fundSummary){
      this.fundStorageService.removeFundInfo(this.fundSummary.code);
      this.updateFundState();
    }      
  }

  addFund() {
    if (this.fundSummary) {
      let fundInfo = <FundInfo>{
        code: this.fundSummary.code,
        name: this.fundSummary.name,
        type: this.fundSummary.type
      }
      this.fundStorageService.addFundInfo(fundInfo);
      this.updateFundState();
    }
  }

  initTimer() {
    this.timer = Observable.timer(300000, 300000);
    this.subscription = this.timer.subscribe(t => this.getFundSummary());
  }

  destroyTimer() {
    this.subscription.unsubscribe();
  }

}
