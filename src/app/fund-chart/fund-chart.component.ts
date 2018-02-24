import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DataSet } from '@antv/data-set';

@Component({
  selector: 'fund-chart',
  templateUrl: './fund-chart.component.html',
  styleUrls: ['./fund-chart.component.css']
})
export class FundChartComponent implements OnInit {

  constructor() { }

  @Input() showTimeButtons: boolean = false;
  @Input() forceFit: boolean = true;
  @Input() height: number = 400;
  @Input() set data(value: { name: string, data: [number, number][] }[]) {
    if (value && value.length) {
      const sourceData = (function (value) {
        const map = new Map<number, any>();
        value.forEach(item => item.data.forEach(d => {          
          if (map.has(d[0]))
            map.get(d[0])[item.name] = d[1];
          else
            map.set(d[0], { date: d[0], [item.name]: d[1] });
        }))
        return Array.from(map).map(item => item[1]);
      })(value);
      this.sourceData = sourceData;
      this.fields = value.map(item => item.name);

      const dataSet = new DataSet({
        state: {
          start: sourceData[0].date,
          end: sourceData[sourceData.length - 1].date
        }
      });
      this.dataSet = dataSet;

      const dataView = this.dataSet.createView();      
      dataView.source(this.sourceData)
        .transform({
          type: 'fold',
          fields: this.fields,
          key: 'name',
          value: 'value',
        })
        .transform({
          type: 'filter',
          callback: obj => {
            return obj.date <= this.dataSet.state.end && obj.date >= this.dataSet.state.start;
          }
        });
      this.dataView = dataView;
    }
    else {
      this.sourceData = [];
      this.fields = [];
      this.dataView = [];
    }
  }

  private sourceData: any;
  private fields: any;
  private dataSet: any;
  private dataView: any;

  private scale = [{
    dataKey: 'date',
    type: 'time',
    tickCount: 8,
    mask: 'YY-MM-DD'
  }];
  private style = { stroke: '#fff', lineWidth: 1 };

  selectTime(days: number) {
    let end = this.sourceData[this.sourceData.length - 1].date;
    let start = days ? end - days * 86400000 : this.sourceData[0].date;
    this.dataSet.setState("start", start);
    this.dataSet.setState("end", end);

    const dataView = this.dataSet.createView();
    dataView.source(this.sourceData)      
      .transform({
        type: 'fold',
        fields: this.fields,
        key: 'name',
        value: 'value',
      })
      .transform({
        type: 'filter',
        callback: obj => {
          return obj.date <= this.dataSet.state.end && obj.date >= this.dataSet.state.start;
        }
      });
    this.dataView = dataView;
  }

  ngOnInit() {
  }

}
