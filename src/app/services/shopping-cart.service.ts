import { ShoppingCart } from './../models/shopping-cart.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ShoppingCartService {

  private restAPIURL = 'https://glzjasqq14.execute-api.ap-south-1.amazonaws.com/dev/cart';

  constructor(private http: HttpClient) { }

  public getCart(cartkey: string): Observable<any> {
    return this.http.get(this.restAPIURL + '?cartkey=' + cartkey);
  }

  public updateCart(cart: ShoppingCart): Observable<any> {
    return this.http.put(this.restAPIURL, cart);
  }

  public deleteCart(cartkey: string): Observable<any> {
    return this.http.delete(this.restAPIURL + '?cartkey=' + cartkey);
  }
}
