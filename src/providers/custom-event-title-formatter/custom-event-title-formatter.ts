import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';

@Injectable()
export class CustomEventTitleFormatterProvider extends CalendarEventTitleFormatter {
 
  dayTooltip(event: CalendarEvent): string {
    return;
  }
}