import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ViewStoreComponent } from './components/view-store/view-store.component';
import { routing } from './app.routing';
import { RouterModule } from '@angular/router';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartService } from './services/shopping-cart.service';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewStoreComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    routing,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
