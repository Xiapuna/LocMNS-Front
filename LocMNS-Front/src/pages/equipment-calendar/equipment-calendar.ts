import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { LoanCalendarDto } from '../../app/models/loan-calendar-dto';
import { CommonModule } from '@angular/common';
import { CalendarDay } from '../../app/models/calendar-day';

@Component({
  selector: 'app-equipment-calendar',
  imports: [CommonModule],
  templateUrl: './equipment-calendar.html',
  styleUrl: './equipment-calendar.css',
})
export class EquipmentCalendar implements OnInit {
  @Input() reservations: LoanCalendarDto[] = [];
  @Input() selectedStart: Date | null = null;
  @Input() selectedEnd: Date | null = null;

  currentDate = signal(new Date());
  weeks: CalendarDay[][] = [];

  private toLocalDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  get minDate(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  ngOnInit() {
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedStart'] && this.selectedStart) {
      const target = new Date(this.selectedStart);
      target.setHours(0, 0, 0, 0);

      // 👉 On positionne le calendrier sur le mois de la date sélectionnée
      this.currentDate.set(new Date(target.getFullYear(), target.getMonth(), 1));

      // 👉 On régénère le calendrier
      this.generateCalendar();
    }
  }

  generateCalendar() {
    const dDay = this.currentDate();
    const year = dDay.getFullYear();
    const month = dDay.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const start = new Date(firstDay);
    const firstWeekDay = (firstDay.getDay() + 6) % 7;
    start.setDate(start.getDate() - firstWeekDay);

    const end = new Date(lastDay);
    const lastWeekDay = (lastDay.getDay() + 6) % 7;
    end.setDate(end.getDate() + (6 - lastWeekDay));

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const day = new Date(start);
    const weeks: CalendarDay[][] = [];

    while (day <= end) {
      const week: CalendarDay[] = [];

      for (let i = 0; i < 7; i++) {
        const normalized = new Date(day);
        normalized.setHours(0, 0, 0, 0);

        week.push({
          date: normalized,
          reserved: this.isReserved(normalized),
        });
        day.setDate(day.getDate() + 1);
      }

      weeks.push(week);
    }

    this.weeks = weeks;
  }

  isReserved(date: Date): boolean {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    return this.reservations.some((r) => {
      const start = this.toLocalDate(r.startDate);
      const end = this.toLocalDate(r.endDate);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return d >= start && d <= end;
    });
  }

  nextMonth() {
    const day = this.currentDate();
    this.currentDate.set(new Date(day.getFullYear(), day.getMonth() + 1, 1));
    this.generateCalendar();
  }

  prevMonth() {
    const day = this.currentDate();
    this.currentDate.set(new Date(day.getFullYear(), day.getMonth() - 1, 1));
    this.generateCalendar();
  }

  isSelected(date: Date): boolean {
    if (!this.selectedStart || !this.selectedEnd) return false;
    return date >= this.selectedStart && date <= this.selectedEnd;
  }

  isPast(date: Date): boolean {
    return date < this.minDate;
  }
}
