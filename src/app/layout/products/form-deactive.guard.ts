import { ActivatedRoute, CanDeactivateFn } from '@angular/router';
import { ProductsComponent } from './products.component';

export const formDeactiveGuard: CanDeactivateFn<ProductsComponent> = (
  component
) => {
  console.log(component);
  if (component && (component.editMode || !component.editMode)) {
    let confirmation = confirm('Are you sure to exit this page');
    if (confirmation) {
      return true;
    }
  }
  return false;
};
