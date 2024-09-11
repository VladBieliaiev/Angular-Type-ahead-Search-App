import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapWithUnderscope',
  standalone: true,
})
export class WrapWithUnderscopePipe implements PipeTransform {
  transform(value: string): string {
    return `_${value}_`;
  }
}
