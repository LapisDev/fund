import { Injectable } from '@angular/core';

import { FundInfo } from './fund.models';

@Injectable()
export class FundStorageService {
  constructor() {
    // ['160222', '001725', '160517'];
  }

  private fundInfoList: FundInfo[];

  getFundInfoList() {
    if (!this.fundInfoList) {
      const key = "fundInfo";
      let str = localStorage[key];
      if (str) {
        this.fundInfoList = JSON.parse(str);
      } else {
        this.fundInfoList = [];
      }
    }
    return this.fundInfoList;
  }

  setFundInfoList(fundInfoList: FundInfo[]) {
    this.fundInfoList = fundInfoList;
    const key = "fundInfo";
    localStorage[key] = JSON.stringify(fundInfoList);
  }

  removeFundInfo(code: string) {
    let list = this.getFundInfoList();
    let newList = list.filter(item => item.code != code);
    if (newList.length != list.length) {
      this.setFundInfoList(newList);
    }
  }

  addFundInfo(fundInfo: FundInfo) {
    if (fundInfo) {
      let list = this.getFundInfoList();
      let newList = list.filter(item => item.code != fundInfo.code);
      newList.push(fundInfo);
      this.setFundInfoList(newList);
    }
  }

  hasFundInfo(code: string) {
    let list = this.getFundInfoList();
    return list.filter(item => item.code == code).length > 0;    
  }
}