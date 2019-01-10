import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductService } from '../../services/product.service';
import { CartItem } from '../../models/cart-item.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart.model';

const CART_KEY = 'cart';
@Component({
  selector: 'app-view-store',
  templateUrl: './view-store.component.html',
  styleUrls: ['./view-store.component.css']
})
export class ViewStoreComponent implements OnInit {
  products: Product[] = [];
  cart: ShoppingCart = new ShoppingCart();
  public itemCount: number;
  public grossTotal = 0;

  constructor(private productsService: ProductService,
    private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.productsService.getShoppingProducts().subscribe((response) => {
      this.products = response;
    },
      error => {
        console.log(error);
      });

    this.cartService.getCart(CART_KEY).subscribe((response) => {
      this.cart = response.Item;
      if (!this.cart || !this.cart.cartkey) {
        this.cart = new ShoppingCart();
        this.cart.cartkey = CART_KEY;
      }
      this.calculateCart(this.cart);
    },
      error => {
        console.log(error);
      });
  }

  public addProductToCart(product: Product): void {
    this.addItem(product, 1);
  }

  public removeProductFromCart(product: Product): void {
    this.addItem(product, -1);
  }

  public productInCart(product: Product): boolean {
    return this.cart.cartitems.some((p) => p.product.Id === product.Id);
  }

  public addItem(product: Product, quantity: number): void {
    const cart = this.cart;
    let item = cart.cartitems.find((p) => p.product.Id === product.Id);
    if (item === undefined) {
      item = new CartItem();
      item.product = product;
      cart.cartitems.push(item);
    }

    item.quantity += quantity;
    if (item.quantity === 0) {
      cart.cartitems = cart.cartitems.filter((ele) => ele.product.Id !== item.product.Id);
    }

    this.updateCart(cart);
  }

  public updateCart(cart: ShoppingCart) {
    this.cartService.updateCart(cart).subscribe((response) => {
      this.cart = cart;
      this.calculateCart(cart);
    },
      error => {
        console.log(error);
      });
  }

  private calculateCart(cart: ShoppingCart): void {
    this.itemCount = cart.cartitems.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    this.grossTotal = cart.cartitems
      .map((item) => item.quantity * item.product.price)
      .reduce((previous, current) => previous + current, 0);
  }

  public emptyCart() {
    this.cartService.deleteCart(CART_KEY).subscribe((response) => {
      this.cart = new ShoppingCart();
      this.itemCount = 0;
      this.grossTotal = 0;
    },
      error => {
        console.log(error);
      });
  }
}
