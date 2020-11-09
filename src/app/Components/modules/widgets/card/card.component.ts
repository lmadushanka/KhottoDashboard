import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { KhottoDashboardService } from 'src/app/Services/khotto-dashboard/khotto-dashboard.service';

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

  constructor(private khottoDashboardService:KhottoDashboardService ) { }

  sales = [];

  salesCount:number[] = [];

  ngOnInit(): void {

    this.khottoDashboardService.getProviderGrowth().subscribe((res) =>{
      console.log(res);

      var data = res.data;

      for(var i = 0; i < data.length; i++){
        this.salesCount.push(data[i]);
      }
      
    });

    this.sales = [1,9,6,4,6,12,43,16,4,6,1];


    console.log(this.salesCount);

    
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
        data: this.sales
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


