import { Pipe, PipeTransform } from '@angular/core';
import { getTransactionStatus } from '../utils/utils';


@Pipe({
  name: 'transactionStatus',
  standalone: true,
})
export class TransactionStatusPipe implements PipeTransform {
  transform(value: string | Date): string {
    return getTransactionStatus(new Date(value));
  }
}
