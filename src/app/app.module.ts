import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { SchedulerAppComponent } from './app-scheduler.component';
import { FacilitySelectorComponent } from './facility-selector/facility-selector.component';
import { GridComponent } from './teammate-schedule/grid/grid.component';

@NgModule({
  declarations: [
    SchedulerAppComponent,
    FacilitySelectorComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  bootstrap: [SchedulerAppComponent]
})
export class AppModule { }
