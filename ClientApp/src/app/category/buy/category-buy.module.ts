import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-buy-routing.module';
import { CategoryBuyComponent } from './category-buy.component';
import { CategoryBuyHomeComponent } from './category-buy-home/category-buy-home.component';
import { CategoryBuyEditComponent } from './category-buy-edit/category-buy-edit.component';
import { CategoryBuyListComponent } from './category-buy-list/category-buy-list.component';

import { CategoryBuyDetailComponent } from './category-buy-detail/category-buy-detail.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { CategoryBuyDialogSharedModule } from 'src/app/_shared/components/category-buy-dialog/category-buy-dialog-shared.module';

@NgModule({
  declarations: [
    CategoryBuyComponent,
    CategoryBuyHomeComponent,
    CategoryBuyEditComponent,
    CategoryBuyListComponent,
    CategoryBuyDetailComponent,

  ],
  imports: [
    // Shared
    SharedModule,

    // Material
    MaterialSharedModule,

    // Dialog
    CategoryBuyDialogSharedModule,

    // Routing
    CategoryRoutingModule,
  ],
})
export class CategoryBuyModule { }
