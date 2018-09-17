import { Injectable } from '@angular/core';
import { TeammateSchedule } from './teammate-schedule';
import { Observable } from 'rxjs';
import { FacilityUnstaffedDates } from '../teammate-schedule/iFacilityUnstaffedDates';

@Injectable({
  providedIn: 'root'
})
export class TeammateScheduleService {
  facilityToUnstaffedDates: FacilityUnstaffedDates = {};
  getGridData$: Observable<any>;

  constructor() {
    this.createSampleUnstaffedDateData();
  }

  createSampleUnstaffedDateData() {
    this.facilityToUnstaffedDates['000001'] = ['9/18/2018', '9/21/2018', '9/26/2018'];
    this.facilityToUnstaffedDates['000003'] = ['9/20/2018', '9/25/2018', '9/27/2018'];
    this.facilityToUnstaffedDates['000004'] = ['9/25/2018'];
    this.facilityToUnstaffedDates['000007'] = ['9/19/2018', '9/28/2018'];
  }

  getSchedule(): TeammateSchedule[] {
    const teammateSchedules: TeammateSchedule[] = new Array(
      new TeammateSchedule('Annabelle Adams', 'Reception', 'OFF', '5AM-6PM', '5AM-6PM', 'OFF', 'OFF', '5AM-6PM', 'CLOSED'));
    return teammateSchedules;
  }

  getDatesUnderStaffed(facilityId: string): string[] {
    const dates = this.facilityToUnstaffedDates[facilityId];
    return dates;
  }
}
