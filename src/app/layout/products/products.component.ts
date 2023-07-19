import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';
import { NgForm } from '@angular/forms';
import { map, catchError, of, Subscription } from 'rxjs';
import { Product } from 'src/app/model/products';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild('productForm') form!: NgForm;
  errorSubscription: Subscription;
  allProducts: Product[] = [];
  setLoading: boolean = false;
  editMode: boolean = false;
  currentId: string = '';
  errorMsg: string = '';
  posterrorMsg: string = '';

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
    this.errorSubscription = this.productService.errSubject.subscribe(
      (errorMsg) => {
        this.posterrorMsg = errorMsg;
      }
    );
  }

  onCreate(products: { name: string; description: string; price: number }) {
    if (!this.editMode) {
      this.productService.createProduct(products);
    } else {
      this.productService.updateProduct(this.currentId, products);
      this.editMode = false;
      this.form.resetForm();
    }

    /*
   const data$ = ajax<{name :string}>({
     method: 'POST',
     url: url,
     body: this.createProductObj,
   });
   data$.subscribe((res) => console.log(res))
*/
  }

  private fetchPosts() {
    this.setLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.setLoading = false;
        this.allProducts = products;
      },
      error: (error) => {
        console.log(error);
        this.setLoading = false;
        this.errorMsg = error;
      },
    });
    /*
    const data$ = ajax<{ [key: string]: Product }>({
      method: 'GET',
      url: 'https://fakestoreapi.com/products',
    }).pipe(
      map((userResponse) => console.log(userResponse.response)),
      catchError((error) => {
        console.log(error);
        // of : emiting a sequence of number and  object array and functions
        return of(error);
      })
    );
    data$.subscribe((res) => console.log(res));
    */
  }

  fetchProducts() {
    this.fetchPosts();
  }

  errorRemove() {
    this.errorMsg = '';
  }

  onDelete(id: string) {
    this.productService.deleteProduct(id).subscribe();
  }

  onDeleteAllProducts() {
    this.productService.deleteAllProducts().subscribe(() => {
      this.allProducts = [];
    });
  }

  onEdit(id: string) {
    // grab the current updated id with the help of products arr

    const currentProduct = this.allProducts.find(
      (product) => product.id === id
    );
    // display the details in the form
    this.form.setValue({
      name: currentProduct.name,
      description: currentProduct.description,
      price: currentProduct.price,
    });
    this.editMode = true;
    this.currentId = currentProduct.id;

    // change the add produt to update if it is update mode
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
