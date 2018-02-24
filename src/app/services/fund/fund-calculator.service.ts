import { Injectable } from '@angular/core';

import { FundInfo, FundSummary, FundDetail } from './fund.models';

@Injectable()
export class FundCalulatorService {
  constructor() {
  }

  calculateAverage(fundDetail: FundDetail, days: number) {
    if (fundDetail && fundDetail.accNetValue) {
      let values = fundDetail.accNetValue.filter(item => item.name == "累计净值");
      if (values.length > 0) {
        let data = values[0].data;
        let average = data.map((d, i) => {
          if (i + days < data.length) {
            let value = parseFloat(
              (data.slice(i, i + days)
                .map(d => d[1])
                .reduce((a, b) => a + b) / days).toFixed(4)
            );
            let date = data[i + days][0];
            return <[number, number]>[date, value];
          }
          else {
            return null;
          }
        }).filter(item => item)
        fundDetail.accNetValue.push({
          name: `${days}日均线`,
          data: average
        })        
      }
    }
    return fundDetail;
  }
}