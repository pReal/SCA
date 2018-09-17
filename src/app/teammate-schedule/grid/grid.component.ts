import { Component, Input } from '@angular/core';
import { ScheduleRetrievalParams } from '../../scheduleRetrievalParams';
import { TeammateScheduleService } from '../teammate-schedule.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent {
  @Input() scheduleRetrievalParams: ScheduleRetrievalParams;
  private gridApi;
  private gridColumnApi;
  rowData: any[];

  columnDefs = [
    {headerName: 'Teammate', field: 'teammateName' },
    {headerName: 'Employee Type', field: 'teammateType' },
    {headerName: 'Monday', field: 'monday'},
    {headerName: 'Tuesday', field: 'tuesday'},
    {headerName: 'Wednesday', field: 'wednesday'},
    {headerName: 'Thursday', field: 'thursday'},
    {headerName: 'Friday', field: 'friday'},
    {headerName: 'Saturday', field: 'saturday'},
    {headerName: 'Sunday', field: 'sunday'}
];

  constructor(private teammateScheduleService: TeammateScheduleService) {
     this.rowData = [];
  }

  populateGrid() {
    const areScheduleParamsValid = this.areScheduleParamsValid();

    if (areScheduleParamsValid === false) {
      alert('A facility and date must be selected.');
      return;
    }

    const data = this.teammateScheduleService.getSchedule();
    this.gridApi.setRowData(data);
  }

  areScheduleParamsValid(): boolean {
    const parametersAreValid: boolean = this.scheduleRetrievalParams.date.length > 0 && this.scheduleRetrievalParams.facilityId.length > 0;
    return parametersAreValid;
  }

  onGridReadyHandler(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }
}
