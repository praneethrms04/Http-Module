import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  map,
  catchError,
  of,
  throwError,
  tap,
} from 'rxjs';
import { Product } from 'src/app/model/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  errSubject = new Subject<string>();
  allProducts: Product[] = [];

  private productsURL =
    'https://angularbyprocademy-f17fc-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  // create a product :
  createProduct(products: {
    name: string;
    description: string;
    price: number;
  }) {
    this.http
      .post<{ name: string }>(`${this.productsURL}/products.json`, products, {
        observe: 'response',
      })
      .subscribe({
        next: (res) => console.log(res),
        error: (error) => this.errSubject.next(error.message),
        complete: () => console.log('Comleted'),
      });
  }

  // get all Products :

  getAllProducts() {
    const searchTerm = 'praneeth';
    const headers = new HttpHeaders()
      .set('customHe', 'Hello there')
      .set('Autherization', 'token');
    const params = new HttpParams()
      .set('serach', searchTerm)
      .set('sort', 'category');
    return this.http
      .get<{ [key: string]: Product }>(`${this.productsURL}/products.json`, {
        headers: headers,
        params: params,
      })
      .pipe(
        map((res) => {
          const products: Product[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              products.push({ ...res[key], id: key });
            }
          }
          return products;
        }),
        catchError((error) => {
          console.error(error.message);
          // Return an Observable or ObservableInput<any> here, e.g., an empty array
          return throwError(() => new Error(error.message)); // For example, returning an empty array as a fallback
        })
      );
  }

  // delete Product

  deleteProduct(id: string) {
    return this.http
      .delete(`${this.productsURL}/products/${id}.json`, {
        observe: 'events',
      })
      .pipe(
        tap((event) => {
          if (event.type === HttpEventType.Response) {
            console.log(event.status);
          }
        })
      );
  }

  // delete all Products

  deleteAllProducts() {
    return this.http.delete(`${this.productsURL}/products.json`);
  }

  updateProduct(id: string, newProduct: Product) {
    return this.http
      .put(`${this.productsURL}/products/${id}.json`, newProduct)
      .subscribe(
        (res) => console.log('update success'),
        (err) => console.log(err)
      );
  }
}
