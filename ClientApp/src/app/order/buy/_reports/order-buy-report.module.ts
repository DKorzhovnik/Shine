import { OrderBuyReportEmployeeComponent } from './order-buy-report-employee/order-buy-report-employee.component';
import { OrderBuyReportHomeComponent } from './order-buy-report-home/order-buy-report-home.component';
import { OrderBuyReportRoutingModule } from './order-buy-report-routing.module';
import { OrderBuyReportComponent } from './order-buy-report.component';
import { NgModule } from '@angular/core';
import { StarRatingModule } from 'angular-star-rating';
import { OrderBuyMonthChartModule } from 'src/app/_shared/components/_buy/orders/_charts/order-buy-month-chart/order-buy-month-chart.module';
import { OrderBuyDebtCardModule } from 'src/app/_shared/components/_buy/orders/_reports/order-buy-debt-card/order-buy-debt-card.module';
import { OrderBuyDetailCardModule } from 'src/app/_shared/components/_buy/orders/_reports/order-buy-detail-card/order-buy-detail-card.module';
import { OrderBuyLatestModule } from 'src/app/_shared/components/_buy/orders/_reports/order-buy-latest/order-buy-latest.module';
import { OrderBuyReportSupplierPivotMonthModule } from 'src/app/_shared/components/_buy/orders/_reports/order-buy-report-supplier-pivot-month/order-buy-report-supplier-pivot-month.module';
import { OrderBuyReportSupplierPivotQuarterModule } from 'src/app/_shared/components/_buy/orders/_reports/order-buy-report-supplier-pivot-quarter/order-buy-report-supplier-pivot-quarter.module';
import { OrderBuyTopModule } from 'src/app/_shared/components/_buy/orders/_reports/order-buy-top/order-buy-top.module';
import { SupplierReportDebtModule } from 'src/app/_shared/components/_buy/suppliers/_reports/supplier-report-debt/supplier-report-debt.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
  declarations: [OrderBuyReportComponent, OrderBuyReportHomeComponent, OrderBuyReportEmployeeComponent],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    // Feather modules
    OrderBuyReportSupplierPivotMonthModule,
    OrderBuyReportSupplierPivotQuarterModule,
    OrderBuyMonthChartModule,
    StarRatingModule,
    SupplierReportDebtModule,
    OrderBuyTopModule,
    OrderBuyLatestModule,
    OrderBuyDebtCardModule,
    OrderBuyDetailCardModule,

    // Routing
    OrderBuyReportRoutingModule
  ]
})
export class OrderBuyReportModule {}
