import { Component, OnInit } from '@angular/core';
import { BooksServiceService } from '../../../provider/books-service.service';
import { HttpClient } from '@angular/common/http';
import { PopupService } from 'src/provider/popup.service';
import $ from 'jquery';

@Component({
  selector: 'app-e-books',
  templateUrl: './e-books.component.html',
  styleUrls: ['./e-books.component.scss']
})
export class EBooksComponent implements OnInit {
  checked = true;
  allBooks = [];
  unfiltered = [];
  filterBook = [];
  eBookShow: boolean;
  constructor(private booksServiceService: BooksServiceService, private http: HttpClient, public popupService: PopupService) { }
 
  getBooksMockData() {
    this.booksServiceService.getBooksMockData().subscribe(res => {
      //this.allBooks = res['booksMockData'];
      this.allBooks = res['allBooks'];
      this.unfiltered = res['allBooks'];
      if (this.allBooks === null) {
        this.eBookShow = false;
      } else {
        this.eBookShow = true;
      }
      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
    });
  }

  bookFilter(filterValue) {
    if (filterValue.checked) {
      this.filterBook.push(filterValue.source.value);
      if (this.filterBook.indexOf('all') !== -1) {
        this.allBooks = this.unfiltered;
      } else {
        this.allBooks = [];
        for (let i = 0; i < this.filterBook.length; i++) {
          if (this.filterBook[i] !== 'all') {
            this.allBooks = this.allBooks.concat(this.unfiltered.filter(
              x => x.bookType === this.filterBook[i]
            ));
          }
        }
      }
    } else {
      if (filterValue.source.value === 'all') {
        this.allBooks = [];
        const b = this.filterBook.findIndex(x => x === filterValue.source.value);
        this.filterBook.splice(b, 1);
        if (this.filterBook.length) {
          for (let i = 0; i < this.filterBook.length; i++) {
            this.allBooks = this.allBooks.concat(this.unfiltered.filter(
              x => x.bookType === this.filterBook[i]
            ));
          }
        } else {
          this.allBooks = this.unfiltered;
        }
      } else {
        if (this.filterBook.indexOf('all') !== -1) {
          const b = this.filterBook.findIndex(x => x === filterValue.source.value);
          this.filterBook.splice(b, 1);
          this.allBooks = this.unfiltered;
        } else {
          this.allBooks = [];
          const a = this.filterBook.findIndex(x => x === filterValue.source.value);
          this.filterBook.splice(a, 1);
          if (this.filterBook.length) {
            for (let i = 0; i < this.filterBook.length; i++) {
              if (this.filterBook[i] !== 'all') {
                this.allBooks = this.allBooks.concat(this.unfiltered.filter(
                  x => x.bookType === this.filterBook[i]
                ));
              }
            }
          } else {
            this.allBooks = this.unfiltered;
          }
        }
      }
    }
  }
  ngOnInit() {
    this.getBooksMockData();
  }

}
