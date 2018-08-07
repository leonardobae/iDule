import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { getISOWeek } from 'date-fns';
 
@Injectable()
export class CustomDateFormatterProvider extends CalendarDateFormatter {
 
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'h', locale) + "교시";
  }
 
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(date, 'y', locale);
    const weekNumber: number = getISOWeek(date);
    return `Week ${weekNumber} in ${year}`;
  }
 
  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'E', locale);
  }
 
  public weekViewColumnSubHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'MM/dd', locale);
  }
 
}