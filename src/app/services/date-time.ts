import { Injectable } from '@angular/core';
import moment from 'moment'

@Injectable({ providedIn: 'root' })
export class DateTimeService {
  formatDate = (date: string) => moment(date).format('DD.MM.YYYY')
}
