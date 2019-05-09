import { NgModule } from '@angular/core';
import { OrderBuyEditDialogSharedModule } from 'src/app/_shared/components/order-buy-edit-dialog/order-buy-edit-dialog-shared.module';
import { PaymentEditDialogSharedModule } from 'src/app/_shared/components/payment-edit-dialog/payment-edit-dialog-shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { OrderBuyDetailComponent } from './order-buy-detail/order-buy-detail.component';
import { OrderBuyProductDetailsComponent } from './order-buy-detail/order-buy-product-details/order-buy-product-details.component';
import { OrderBuyAddProductsComponent } from './order-buy-edit/order-buy-add-products/order-buy-add-products.component';
import { OrderBuyEditComponent } from './order-buy-edit/order-buy-edit.component';
import { OrderBuyHomeComponent } from './order-buy-home/order-buy-home.component';
import { OrderBuyListComponent } from './order-buy-list/order-buy-list.component';
import { OrderBuyRoutingModule } from './order-buy-routing.module';
import { OrderBuyComponent } from './order-buy.component';


@NgModule({
  declarations: [
    OrderBuyComponent,
    OrderBuyDetailComponent,
    OrderBuyEditComponent,
    OrderBuyHomeComponent,
    OrderBuyListComponent,
    OrderBuyAddProductsComponent,
    OrderBuyProductDetailsComponent
  ],
  imports: [
    // Shared
    SharedModule,

    // Dialog
    OrderBuyEditDialogSharedModule,
    PaymentEditDialogSharedModule,

    // Material
    MaterialSharedModule,

    // Routing
    OrderBuyRoutingModule
  ]
})
export class OrderBuyModule {}
