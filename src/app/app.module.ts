import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { ObservablesComponent } from './layout/observables/observables.component';
import { ProductsComponent } from './layout/products/products.component';
import { ObservablePromiseComponent } from './pages/observable-promise/observable-promise.component';
import { ObservablePromiseModule } from './pages/observable-promise/observable-promise.module';
import { ProductModule } from './pages/product/product.module';
import { ProductComponent } from './pages/product/product.component';
import { RemovedecimalPipe } from './pipes/removedecimal.pipe';
import { ExampleInterceptorInterceptor } from './example-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ObservablesComponent,
    ProductsComponent,
    ObservablePromiseComponent,
    ProductComponent,
    RemovedecimalPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ObservablePromiseModule,
    ProductModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExampleInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
