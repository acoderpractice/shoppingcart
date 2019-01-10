import { CartItem } from './cart-item.model';

export class ShoppingCart {
  public cartkey = 'cart';
  public cartitems: CartItem[] = new Array<CartItem>();
}
