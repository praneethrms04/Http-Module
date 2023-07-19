import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservablesComponent } from './layout/observables/observables.component';
import { ProductsComponent } from './layout/products/products.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { formDeactiveGuard } from './layout/products/form-deactive.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'observables',
    component: ObservablesComponent,
    children: [
      {
        path: 'observables-promise',
        loadChildren: () =>
          import('./pages/observable-promise/observable-promise.module').then(
            (m) => m.ObservablePromiseModule
          ),
      },
      {
        path: 'subjects',
        loadChildren: () =>
          import('./pages/subjects/subjects.module').then(
            (res) => res.SubjectsModule
          ),
      },
    ],
  },
  {
    path: 'products',
    component: ProductsComponent,
    canDeactivate: [formDeactiveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
