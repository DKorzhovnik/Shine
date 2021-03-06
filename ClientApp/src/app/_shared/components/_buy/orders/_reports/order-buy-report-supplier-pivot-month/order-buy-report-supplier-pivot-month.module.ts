import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OrderBuyReportSupplierPivotMonthComponent } from './order-buy-report-supplier-pivot-month.component';
import { OrderBuyReportSupplierPivotMonthChartComponent } from './chart/order-buy-report-supplier-pivot-month-chart.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [OrderBuyReportSupplierPivotMonthComponent, OrderBuyReportSupplierPivotMonthChartComponent],
  imports: [
    // Material
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,

    // Share module
    SharedModule,

    // Google charts
    GoogleChartsModule
  ],
  exports: [
    OrderBuyReportSupplierPivotMonthComponent,
    OrderBuyReportSupplierPivotMonthChartComponent,

    // Material
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,

    // Share module
    SharedModule,

    // Google charts
    GoogleChartsModule
  ]
})
export class OrderBuyReportSupplierPivotMonthModule {}
