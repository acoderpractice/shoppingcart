import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';

@Injectable()
export class ProductService {
  private restAPIURL = 'https://glzjasqq14.execute-api.ap-south-1.amazonaws.com/dev/products';

  constructor(private http: HttpClient) { }

  public getShoppingProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.restAPIURL);
  }
}
