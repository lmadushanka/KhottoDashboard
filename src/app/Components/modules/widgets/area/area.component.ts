import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widgets-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit {
  chartOptions: {};

  Highcharts = Highcharts;

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'spline',
        backgroundColor: 'rgb(173, 173, 173, 0.1)',
        plotBackgroundColor: '#ffffff',
      },
      title: {
        text: 'Khotto Sales',
      },
      subtitle: {
        text: 'Visualization of sales details.',
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
        valueSuffix: ' Sales',
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
      credits: {
        enabled: false,
      },
      legend: false,
      exporting: {
        enabled: true,
      },
      series: [
        {
          name: 'Food',
          data: [1, 2, 3, 4, 5, 6, 27, 45, 39, 20, 31, 52, 63, 105, 75, 66],
          fillColor: 'rgb(0, 123, 255, 0.3)',
          lineColor: 'rgb(0, 123, 255)',
          marker: {
            fillColor: 'rgb(0, 123, 255, 0.7)',
          },
        },
        {
          name: 'Accommodation',
          data: [2, 4, 6, 8, 50, 25, 14, 26, 97, 68, 70, 62, 107, 76, 58, 30],
          fillColor: 'rgb(32, 201, 151, 0.3)',
          lineColor: 'rgb(32, 201, 151)',
          marker: {
            fillColor: 'rgb(32, 201, 151, 0.7)',
          },
        },
      ],
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
