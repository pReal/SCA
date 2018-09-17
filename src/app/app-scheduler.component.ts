import { Component, OnInit} from '@angular/core';
import { ScheduleRetrievalParams } from './scheduleRetrievalParams';

@Component({
  selector: 'app-scheduler',
  templateUrl: './app-scheduler.component.html'
})
export class SchedulerAppComponent implements OnInit {
  rowData: any;
  scheduleRetrievalParams: ScheduleRetrievalParams;

  ngOnInit() {
    this.initializeScheduleRetrievalParameters();
  }

  private initializeScheduleRetrievalParameters() {
    const params = new ScheduleRetrievalParams();
    params.facilityId = '';
    params.date = '';
    this.scheduleRetrievalParams = params;
  }
}

