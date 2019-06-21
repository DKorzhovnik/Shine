import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { OrderBySupplierPivotMonth } from 'src/app/supplier/_interfaces/reports/order-by-supplier-pivot-month';

@Component({
  selector: 'app-order-buy-report-supplier-chart',
  templateUrl: './order-buy-report-supplier-chart.component.html',
  styleUrls: ['./order-buy-report-supplier-chart.component.css']
})
export class OrderBuyReportSupplierChartComponent implements OnInit {
  @Input() chartData: OrderBySupplierPivotMonth;

  title = `evenue by`;
  type = 'ColumnChart';
  data = [[]];
  columnNames = ['Month', 'Values'];
  options = {};
  width = 1000;
  height = 400;

  constructor() {}

  ngOnInit() {
    this.data = [
      ['Jan', +`${this.chartData.jan}`],
      ['Feb', +`${this.chartData.feb}`],
      ['Mar', +`${this.chartData.mar}`],
      ['Apr', +`${this.chartData.apr}`],
      ['May', +`${this.chartData.may}`],
      ['Jun', +`${this.chartData.jun}`],
      ['Jul', +`${this.chartData.jul}`],
      ['Aug', +`${this.chartData.aug}`],
      ['Sep', +`${this.chartData.sep}`],
      ['Oct', +`${this.chartData.oct}`],
      ['Nov', +`${this.chartData.nov}`],
      ['Dec', +`${this.chartData.dec}`]
    ];
  }
}
