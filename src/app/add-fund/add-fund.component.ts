import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FundDataService, FundInfo, FundStorageService } from '../services/fund';

@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css']
})
export class AddFundComponent implements OnInit {

  constructor(
    private router: Router,
    private fundStorageService: FundStorageService,
    private fundDataService: FundDataService
  ) { }

  private fundInfoList: FundInfo[];

  ngOnInit() {
    this.fundInfoList = []; 
  }

  addFund(fundInfo: FundInfo) {
    this.fundStorageService.addFundInfo(fundInfo);
    this.router.navigate(['/']);
  }

  searchFundInfoList(input: string) {
    this.fundDataService.searchFundInfoList(input)
      .subscribe(
        fundInfoList => this.fundInfoList = fundInfoList,
        error => console.log(error)
      );
  }
}
