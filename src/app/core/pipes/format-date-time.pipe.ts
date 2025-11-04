import { Pipe, PipeTransform } from '@angular/core';
import { formatDateTime } from '../utils/utils';


@Pipe({ name: 'formatDateTime', standalone: true })
export class FormatDateTimePipe implements PipeTransform {
  transform(value: string | Date): string {
    return formatDateTime(new Date(value)).dateTime;
  }
}
