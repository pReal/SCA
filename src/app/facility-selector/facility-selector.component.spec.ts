import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FacilityService, FacilityResponse } from './facility.service';
import { Facility } from './facility';
import { FacilitySelectorComponent } from './facility-selector.component';
import { ScheduleRetrievalParams } from '../scheduleRetrievalParams';
import { Observable, of } from 'rxjs';

describe('FacilitySelectorComponent', () => {
  let component: FacilitySelectorComponent;
  let mockFacilityService;
  let mockTeammateScheduleService;

  beforeEach(() => {
    mockFacilityService = jasmine.createSpyObj('mockFacilityService', ['getFacilities']);
    mockTeammateScheduleService = jasmine.createSpyObj('mockTeammateScheduleService', ['getDatesUnderStaffed', 'facilityToUnstaffedDates']);

    component = new FacilitySelectorComponent(mockFacilityService, mockTeammateScheduleService);
  });

  describe('ngOnInit', () => {
    it('should populate available facilities', () => {
      const facilityResponse: FacilityResponse = {data: [ new Facility()]};

      mockFacilityService.getFacilities.and.returnValue(of(facilityResponse));
      component.ngOnInit();
      expect(component.facilities.length).toBe(1);
    });

    it('should set isDatepickerDisabled to true', () => {
      const facilityResponse: FacilityResponse = {data: [ new Facility()]};

      mockFacilityService.getFacilities.and.returnValue(of(facilityResponse));
      component.ngOnInit();
      expect(component.isDatepickerDisabled).toBe(true);
    });
  });

  describe('facilityChangedHandler', () => {
    beforeEach(() => {
      component.scheduleRetrievalParams = new ScheduleRetrievalParams();
    });

    describe('with facility selected', () => {

      beforeEach(() => {
        const event = {
          target: {
            value: '000001'
          }};

          mockTeammateScheduleService.getDatesUnderStaffed.and.returnValue(['9/16/2018']);

          component.facilityChangedHandler(event);
      });

      it('enables the datepicker', () => {
        expect(component.isDatepickerDisabled).toBe(false);
      });

      it('sets the facilityId on the scheduleRetrievalParams', () => {
        expect(component.scheduleRetrievalParams.facilityId).toBe('000001');
      });

      it('sets the understaffed dates', () => {
        expect(component.underStaffedDates.length).toBe(1);
        expect(component.underStaffedDates[0]).toBe('9/16/2018');
        expect(mockTeammateScheduleService.getDatesUnderStaffed).toHaveBeenCalledWith('000001');
      });
    });

    describe('with no facility selected', () => {
      beforeEach(() => {
        const event = {
          target: {
            value: ''
          }};

          component.facilityChangedHandler(event);
      });

      it('disables the datepicker', () => {
        expect(component.isDatepickerDisabled).toBe(true);
      });

      it('does not attempt to retrieve unstaffed dates', () => {
        expect(mockTeammateScheduleService.getDatesUnderStaffed).toHaveBeenCalledTimes(0);
      });

    });
  });

  describe('dateChangedHandler', () => {
    beforeEach(() => {
      component.scheduleRetrievalParams = new ScheduleRetrievalParams();
    });
  });
});
