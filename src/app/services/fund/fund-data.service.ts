import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { FundInfo, FundSummary, FundDetail } from './fund.models';

@Injectable()
export class FundDataService {
  constructor(private http: Http) {
  }

  getFundSummary(code: string) {
    let url = `http://fund.eastmoney.com/Data/FundCompare_Interface.aspx?t=0&bzdm=${code}&v=${Date.now()}`;
    // var fundinfo = ["基金代码,基金名称,拼音缩写,基金类型,净值估算,估算涨幅,单位净值,日期,累计净值,涨幅,..."];

    return this.http.get(url)
      .map(res => {
        let text = res.text();
        let fundinfo = <string[]>JSON.parse(
          text.split("=")[1].replace(/;/, '')
        );
        if (fundinfo.length > 0) {
          let list = fundinfo[0].split(",");
          return <FundSummary>{
            code: list[0],
            name: list[1],
            type: list[3],
            imputedPrice: list[4] ? parseFloat(list[4]) : null,
            imputedIncrease: list[5] ? parseFloat(list[5]) : null,
            price: list[6] ? parseFloat(list[6]) : null,
            date: list[7],
            increase: list[9] ? parseFloat(list[9]): null
          };
        } else {
          return null;
        }
      });
  }

  getFundDetail(code: string) {
    let url = `http://fund.eastmoney.com/pingzhongdata/${code}.js?v=${Math.floor(Date.now() / 3600000)}`;
    // var fS_name = "基金名称";
    // var fS_code = "基金代码";
    // var Data_ACWorthTrend = [[date,value],...];
    // var Data_grandTotal = [{"name":"基金名称","data":[[date,value],...]},{"name":"同类平均","data":[...]},{"name":"沪深300","data":[...]}];

    return this.http.get(url)
      .map(res => {
        let text = res.text();

        let name = (function (text) {
          let start = text.indexOf("var fs_name");
          if (start < 0)
            start = text.indexOf("var fS_name");
          if (start < 0)
            return null;
          let end = text.indexOf(";", start);
          return JSON.parse(
            text.substring(start, end).split("=")[1].replace(/;/, '')
          );
        })(text);

        let code = (function (text) {
          let start = text.indexOf("var fs_code");
          if (start < 0)
            start = text.indexOf("var fS_code");
          if (start < 0)
            return null;
          let end = text.indexOf(";", start);
          return JSON.parse(
            text.substring(start, end).split("=")[1].replace(/;/, '')
          );
        })(text);

        let totalGrand = (function (text) {
          let start = text.indexOf("var Data_grandTotal");
          if (start < 0)
            return null;
          let end = text.indexOf(";", start);
          return JSON.parse(
            text.substring(start, end).split("=")[1].replace(/;/, '')
          );
        })(text);

        let accNetValue = (function (text) {
          let start = text.indexOf("var Data_ACWorthTrend");
          if (start < 0)
            return null;
          let end = text.indexOf(";", start);
          let acWorthTrend = JSON.parse(
            text.substring(start, end).split("=")[1].replace(/;/, '')
          );
          return [{
            name: "累计净值",
            data: acWorthTrend
          }];
        })(text);

        let sevenDaysYearIncome = (function (text) {
          let start = text.indexOf("var Data_sevenDaysYearIncome");
          if (start < 0)
            return null;
          let end = text.indexOf(";", start);
          let acWorthTrend = JSON.parse(
            text.substring(start, end).split("=")[1].replace(/;/, '')
          );
          return [{
            name: "7日年化收益率",
            data: acWorthTrend
          }];
        })(text);

        return <FundDetail>{
          name: name,
          code: code,
          accNetValue: accNetValue,
          totalGrand: totalGrand,
          sevenDaysYearIncome: sevenDaysYearIncome
        }
      });
  }

  searchFundInfoList(input: string, count: number = 20) {
    let url = `http://fundsuggest.eastmoney.com/FundCode.aspx?input=${input}&count=${count}`;
    // (["基金代码,拼音缩写,基金名称,基金类型",...])

    return this.http.get(url)
      .map(res => {
        let text = res.text();

        let r = <string[]>JSON.parse(
          text.substring(text.indexOf("(") + 1, text.lastIndexOf(")"))
        );
        if (r.length > 0) {
          return r.map(s => {
            let list = s.split(",");
            return <FundInfo>{
              code: list[0],
              name: list[2],
              type: list[3]
            };
          });
        } else {
          return [];
        }
      });
  }

  // getFundInfoList() {
  //   let url = `http://fund.eastmoney.com/js/fundcode_search.js?v=${Math.floor(Date.now() / 3600000)}`;
  //   // var r = [["基金代码","拼音缩写","基金名称","基金类型","基金拼音"],...];

  //   return this.http.get(url)
  //     .map(res => {
  //       let text = res.text();
  //       let r: string[][] = JSON.parse(
  //         text.split("=")[1].replace(/;/, '')
  //       );

  //       if (r.length > 0) {
  //         return r.map(list => {
  //           return <FundInfo>{
  //             code: list[0],
  //             name: list[2],
  //             type: list[3]             
  //           };
  //         })
  //       } else {
  //         return [];
  //       }
  //     });
  // }
}

