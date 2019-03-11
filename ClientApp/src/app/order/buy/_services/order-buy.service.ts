import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderBuyDto } from '../_interfaces/order-buy-dto';
import { OrderBuy } from '../_interfaces/order-buy';
import { ProductOrderDto } from '../_interfaces/product-order-dto';
import { OrderBuyWithDetailsToAddDto } from '../_interfaces/order-buy-with-details-to-add-dto';
import { ProductOrder } from '../_interfaces/product-order';

@Injectable({
  providedIn: 'root'
})
export class OrderBuyService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<OrderBuyDto[]> {
    return this.http.get<OrderBuyDto[]>(`${this.baseUrl}api/orderBuy/`);
  }

  getOrder(id: number): Observable<OrderBuyDto> {
    return this.http.get<OrderBuyDto>(`${this.baseUrl}api/orderBuy/${id}`);
  }

  addOrder(orderBuy: OrderBuy): Observable<OrderBuyDto> {
    return this.http.post<OrderBuyDto>(`${this.baseUrl}api/orderBuy/`, orderBuy);
  }

  updateOrder(orderbuy: OrderBuy): Observable<OrderBuyDto> {
    return this.http.put<OrderBuyDto>(`${this.baseUrl}api/orderBuy/`, orderbuy);
  }

  deleteOrder(orderId: number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + 'api/orderBuy/' + orderId);
  }



  // *ProductOrder
  getProductDetailByOrder(orderId: number): Observable<ProductOrderDto[]> {
    return this.http.get<ProductOrderDto[]>(`${this.baseUrl}api/orderBuy/${orderId}/details`);
  }

  addOrderWithDetails(orderWithDetails: OrderBuyWithDetailsToAddDto) {
    return this.http.post(`${this.baseUrl}api/orderBuy/addWithDetails/`, orderWithDetails);
  }

  addProductOrder(productOrder: ProductOrder): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}api/orderBuy/addProduct/`, productOrder);
  }

  addProductsOrder(productsOrder: ProductOrderDto[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}api/orderBuy/addProducts/`, productsOrder);
  }

  deleteProductOrder(orderId: number, productId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/orderBuy/${orderId}/delete/${productId}`);
  }
}
