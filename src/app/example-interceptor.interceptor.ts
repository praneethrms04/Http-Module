import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpEventType,
} from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';

@Injectable()
export class ExampleInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    localStorage.setItem('token', Math.random().toString());
    const token = localStorage.getItem('token');

    // map((res) => {
    //   const products: Product[] = [];
    //   for (const key in res) {
    //     if (res.hasOwnProperty(key)) {
    //       products.push({ ...res[key], id: key });
    //     }
    //   }
    //   return products;
    // }),

    let reqCopy = request.clone({
      setHeaders: {
        Autherization: token,
        IsAdmin: 'Praneeth',
      },
      method: 'GET',
      body: {
        name: 'Animal',
        description: 'desc',
        price: 1000,
      },
    });

    return next.handle(reqCopy).pipe(
      tap((event) => {
        console.log(event);
        const arr = {};
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      })
    );
  }
}
