import { Routes, RouterModule } from '@angular/router';
import { ViewStoreComponent } from './components/view-store/view-store.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const appRoutes: Routes = [
    {
        component: CheckoutComponent,
        path: 'checkout'
    },
    { path: '**', component: ViewStoreComponent }
];

export const routing = RouterModule.forRoot(appRoutes);

