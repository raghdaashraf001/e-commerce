import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleWords',
  standalone: true,
})
export class TitleWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const words = value.split(' ');
    const twoWords = words.slice(0, 2).join(' ');

    return twoWords;
  }
}
