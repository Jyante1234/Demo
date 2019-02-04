import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotesServiceService {

  booksMockData = 'assets/mockData/mockDataVotes.json';
  constructor(private http: HttpClient) { }
  public getBooksMockData() {
    return this.http.get(this.booksMockData);
  }
}
