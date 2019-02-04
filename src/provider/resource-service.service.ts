import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ResourceServiceService {

  resourceMockData = 'assets/mockData/mockDataResource.json';
  constructor(private http: HttpClient) { }
  public getResourceMockData() {
    return this.http.get(this.resourceMockData);
  }
}
