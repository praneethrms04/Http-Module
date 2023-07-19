import { CanDeactivateFn } from '@angular/router';

export const formDeactiveGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
