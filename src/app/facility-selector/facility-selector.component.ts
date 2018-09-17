import { Component, Input, OnInit } from '@angular/core';
import { FacilityService } from './facility.service';
import { Facility } from './facility';
import { TeammateScheduleService } from '../teammate-schedule/teammate-schedule.service';
import { ScheduleRetrievalParams } from '../scheduleRetrievalParams';
import { NgbDateStruct, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-facility-selector',
  templateUrl: './facility-selector.component.html',
  styleUrls: ['./facility-selector.component.css']
})
export class FacilitySelectorComponent implements OnInit {

  @Input() scheduleRetrievalParams: ScheduleRetrievalParams;

  public facilities: Facility[] = [];
  public datepickerModel: any;
  public isDatepickerDisabled: boolean;
  public underStaffedDates: string[];

  constructor(private facilityService: FacilityService, private teammateScheduleService: TeammateScheduleService) {
  }

  ngOnInit() {
    this.setAvailableFacilities();
    this.isDatepickerDisabled = true;
  }

  setAvailableFacilities() {
    this.facilityService.getFacilities().subscribe(results =>
      results.data.map(facility =>
        this.facilities = [...this.facilities, facility],
      ));
  }

  facilityChangedHandler(event: any) {
    const facilityId = event.target.value;

    this.enableDisableDatepicker(facilityId);

    if (facilityId !== '') {
      this.scheduleRetrievalParams.facilityId = facilityId;
      this.underStaffedDates = this.teammateScheduleService.getDatesUnderStaffed(facilityId);
    }
  }

  dateSelectedHandler(event: any) {
    const selectedDate: string = event.month + '/' + event.day + '/' + event.year;
    this.scheduleRetrievalParams.date = selectedDate;
  }

  dateEnteredHandler(date: string) {
    const enteredDate = new Date(date);

    if (enteredDate.toString() === 'Invalid Date') {
      return;
    }

    const enteredDateFormatted = enteredDate.getMonth() + 1 + '/' + enteredDate.getUTCDate() + '/' + enteredDate.getFullYear();
    this.scheduleRetrievalParams.date = enteredDateFormatted;
  }

  isUnderstaffed(date: NgbDate): boolean {
    const dateStamp = date.month + '/' + date.day + '/' + date.year;
    const dateIsUnderstaffed = this.underStaffedDates.includes(dateStamp);

    return dateIsUnderstaffed;
  }

  idDateDisabled(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);

    return d.getDay() !== 1;
  }

  private enableDisableDatepicker(facilityId: string) {
    this.isDatepickerDisabled = facilityId === '';
  }
}
