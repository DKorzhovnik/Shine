import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
  } from '@angular/core';
import { Subscription } from 'rxjs';

import { OrderBuyService } from 'src/app/_shared/services/buy/order-buy.service';
import { OrderBuyLatest } from 'src/app/_shared/intefaces/buy/order/report/order-buy-latest';

@Component({
  selector: 'app-order-buy-latest',
  templateUrl: './order-buy-latest.component.html',
  styleUrls: ['./order-buy-latest.component.scss']
})
export class OrderBuyLatestComponent implements OnInit, OnDestroy {
  // Subscriptions
  latestOrder$: Subscription;

  // Variables
  latestOrder: OrderBuyLatest;

  // Output
  @Output() orderId = new EventEmitter<number>();
  @Output() showDetail = new EventEmitter<boolean>();
  @Output() showOrderList = new EventEmitter<boolean>();
  

  // Input
  @Input() isDetail = false;
  @Input() isOrderList = false;

  constructor(private orderService: OrderBuyService) {}

  ngOnInit() {
    this.getLatestOrder();
  }

  ngOnDestroy() {
    this.latestOrder$.unsubscribe();
  }

  getLatestOrder() {
    this.latestOrder$ = this.orderService.getLatestOrder().subscribe((res: OrderBuyLatest) => {
      this.latestOrder = res;

      // emit OrderId
      this.orderId.emit(this.latestOrder.orderId);
    });
  }

  // *Output

  outShowDetail() {
    this.showDetail.emit(!this.isDetail);
  }

  outShowOrderList() {
    this.showOrderList.emit(!this.isOrderList);
  }
}
