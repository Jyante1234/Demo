import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignBooksService {

  assignBooksJSON = 'assets/mockData/mockAssignBooks.json';
  constructor(private http: HttpClient) { }
  public getAssignBookskData() {
    return this.http.get(this.assignBooksJSON);
  }
}
