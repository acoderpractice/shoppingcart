import { ShoppingCart } from './../../models/shopping-cart.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { CartItem } from '../../models/cart-item.model';

const CART_KEY = 'cart';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public cartItems: CartItem[] = new Array<CartItem>();
  public grossTotal = 0;
  public salesTax = 0;
  public importDuty = 0;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.cartService.getCart(CART_KEY).subscribe((response) => {
      const cart = response.Item;
      this.cartItems = cart.cartitems;
      this.calculateCartTotal(cart);
    },
      error => {
        console.log(error);
      });
  }

  private calculateCartTotal(cart: ShoppingCart): void {
    const cartTotal = cart.cartitems
      .map((item) => item.quantity * item.product.price)
      .reduce((previous, current) => previous + current, 0);

    let importDutyTotal = 0;
    let salesTaxTotal = 0;
    cart.cartitems.forEach(element => {

      if (element.product.isImported === 'Yes') {
        importDutyTotal = importDutyTotal + Number(element.product.price);
      }
      if (element.product.isSalesTax === 'Yes') {
        salesTaxTotal = salesTaxTotal + Number(element.product.price);
      }
    });

    this.importDuty = (importDutyTotal * 0.05);
    this.salesTax = (salesTaxTotal * 0.1);
    this.grossTotal = cartTotal + Number((Math.ceil(this.importDuty * 20) / 20).toFixed(2))
      + Number((Math.ceil(this.salesTax * 20) / 20).toFixed(2));
  }

}
