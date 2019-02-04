import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AskJohnnieMaxServiceService {

  askJohnnieMaxMockData = 'assets/mockData/Mock Data/mockDataAskJohnnieMax.json';
  constructor(private http: HttpClient) { }
  public getaskJohnnieMaxMockData() {
    return this.http.get(this.askJohnnieMaxMockData);
  }
 
}
