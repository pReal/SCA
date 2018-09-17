import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facility } from './facility';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  constructor(private readonly http: HttpClient) { }

  getFacilities(): Observable<FacilityResponse> {
    return this.http.get<FacilityResponse>('http://scadevjobs.com/api/Locations');
  }
}

export interface FacilityResponse {
  data: Facility[];
}
