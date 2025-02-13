import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText',
  standalone: true
})
export class FormatTextPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return value
      .replace(/_/g, ' ') // Reemplaza guiones bajos por espacios
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitaliza cada palabra
  }

}
