import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BooksServiceService {

  booksMockData = 'assets/mockData/mockDataBooks.json';
  constructor(private http: HttpClient) { }
  public getBooksMockData() {
    return this.http.get(this.booksMockData);
  }
}
