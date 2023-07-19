import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservablePromiseComponent } from './observable-promise.component';

const routes: Routes = [
  {
    path: '',
    component: ObservablePromiseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservablePromiseRoutingModule {}
