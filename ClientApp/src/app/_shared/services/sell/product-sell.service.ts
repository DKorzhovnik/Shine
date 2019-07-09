import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSellDto } from '../../intefaces/sell/product/product-sell-dto';
import { ProductSell } from '../../intefaces/sell/product/product-sell';

@Injectable({
  providedIn: 'root'
})
export class ProductSellService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getProductList(): Observable<ProductSellDto[]> {
    return this.http.get<ProductSellDto[]>(this.baseUrl + 'api/productSell/');
  }

  getProduct(id: number): Observable<ProductSell> {
    return this.http.get<ProductSell>(this.baseUrl + 'api/productSell/' + id);
  }

  addProduct(productSell: ProductSell): Observable<ProductSell> {
    return this.http.post<ProductSell>(this.baseUrl + 'api/productSell/', productSell);
  }

  updateProduct(productSell: ProductSell): Observable<ProductSell> {
    return this.http.put<ProductSell>(this.baseUrl + 'api/productSell/', productSell);
  }

  deleteProduct(id: number) {
    this.http.delete<ProductSell>(this.baseUrl + 'api/productSell/' + id).subscribe();
  }

}