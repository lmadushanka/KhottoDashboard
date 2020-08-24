import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() label: string;
  @Input() total: string;
  @Input() percentage: string;

  Highcharts = Highcharts;

  chartOptions={};

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
          type: 'area',
          backgroundColor: null,
          borderWidth: 0,
          margin:[2,2,2,2],
          height:60
      },
      title: {
          text: null
      },
      subtitle: {
          text: null
      },
      // xAxis: {
      //     categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      //     tickmarkPlacement: 'on',
      //     title: {
      //         enabled: false
      //     }
      // },
      // yAxis: {
      //     title: {
      //         text: 'Sales'
      //     },
      //     labels: {
      //         formatter: function () {
      //             return this.value;
      //         }
      //     }
      // },
      tooltip: {
          split: true,
          // valueSuffix: ' Sales'
          outide: true
      },
      legend: {
        enabled: false
      },
      // plotOptions: {
      //     area: {
      //         stacking: 'normal',
      //         lineColor: '#666666',
      //         lineWidth: 1,
      //         marker: {
      //             lineWidth: 1,
      //             lineColor: '#666666'
      //         }
      //     }
      // },
      credits:{
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      xAxis: {
        labels:{
          enabled: false
        },
        title :{
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickOption:[]
      },
      yAxis: {
        labels:{
          enabled: false
        },
        title :{
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickOption:[]
      },
      series: [{
        data: [71,78,39,66]
      }]
  };

  HC_exporting(Highcharts);

  setTimeout(() =>{
    window.dispatchEvent(
      new Event('resize')
    );
  },300);
  }

}
