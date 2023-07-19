import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removedecimal',
})
export class RemovedecimalPipe implements PipeTransform {
  transform(value: string): string {
    // Check if the value is valid
    if (typeof value !== 'string') {
      return value;
    }

    const index = value.indexOf('.');
    if (index !== -1) {
      return value.slice(0, index);
    }

    return value;
  }
}
