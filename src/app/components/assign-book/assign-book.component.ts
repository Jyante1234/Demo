import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PopupService } from 'src/provider/popup.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AssignBooksService } from 'src/provider/assign-books.service';

@Component({
  selector: 'app-assign-book',
  templateUrl: './assign-book.component.html',
  styleUrls: ['./assign-book.component.scss']
})
export class AssignBookComponent implements OnInit {
  classes = [];
  groups = [];
  students = [];
  defaultStudents = [];
  assignedClassArray = [];
  assignedGroupArray = [];
  assignedStudentsArray = [];
  assignBookClass: boolean;
  assignBookGroup: boolean;
  assignBookStudent: boolean;
  assignBookActiveId = [];
  activeClassIndex: number;
  allBooks = [];
  unfiltered = [];
  filterBook = [];
  progressSpinner = true;
  @ViewChildren('checkboxMultiple') private checkboxesMultiple: QueryList<any>;
  public getMockData() {
    if (JSON.parse(localStorage.getItem('classes'))) {
      this.classes = JSON.parse(localStorage.getItem('classes'));
    } else {
      this.classes = [];
    }
    if (JSON.parse(localStorage.getItem('groups'))) {
      this.groups = JSON.parse(localStorage.getItem('groups'));
    } else {
      this.groups = [];
    }
    if (JSON.parse(localStorage.getItem('students'))) {
      this.students = JSON.parse(localStorage.getItem('students'));
    } else {
      this.students = [];
    }
  }
  activeClassIds(index) {
    this.classes.forEach(element => {
      this.assignedClassArray.push('activeClass_' + element.classId);
    });
    this.classes[index]['groups'].forEach(element => {
      this.assignedClassArray.push('activeClassGroup_' + element.groupId);
    });
  }
  activeStudentIds() {
    this.students.forEach(element => {
      this.assignedStudentsArray.push('activeStudent_' + element.studentId);
    });
  }
  getActiveClassIndex(type, id) {
    if (type === 'classGroup') {
      for (let i = 0; i < this.classes.length; i++) {
        if (this.classes[i].classId === id) {
          this.activeClassIds(i);
          return i;
        }
      }
    } else {
      for (let i = 0; i < this.students.length; i++) {
        if (this.students[i].studentId === id) {
          this.activeStudentIds();
          return i;
        }
      }
    }
  }
  getAssignBookData(assignBookType) {
    this.progressSpinner = true;
    this.getAllBooks();
    this.assignBookClass = this.assignBookStudent = false;
    this.assignBookActiveId = JSON.parse(localStorage.getItem('assignBookActiveId'));
    this.activeClassIndex = this.getActiveClassIndex(this.assignBookActiveId[0].type, this.assignBookActiveId[0].id);
    if (assignBookType === 'classGroup') {
      this.assignBookClass = true;
    } else if (assignBookType === 'student') {
      this.assignBookStudent = true;
    } else {
    }
  }
  getAllBooks() {
    this.assignBooks.getAssignBookskData().subscribe(
      data => {
        this.allBooks = data['allBooks'];
        this.unfiltered = data['allBooks'];
        this.progressSpinner = false;
      }
    );
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
  clearCheckBoxes() {
    this.filterBook = [];
    this.allBooks = this.unfiltered;
    const checkboxesArray = this.checkboxesMultiple.toArray();
    checkboxesArray.forEach(
      element => {
        element.checked = false;
      }
    );
  }
  drop(event: CdkDragDrop<string[]>, type, i, l) {
    let bookISBNs = [];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (type === 'class') {
        bookISBNs = [];
        for (let k = 0; k < Object.keys(this.classes[i]['assignedBooks']).length; k++) {
          bookISBNs.push(this.classes[i]['assignedBooks'][k].bookISBN);
        }
        if (bookISBNs.indexOf(JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex])).bookISBN) !== -1) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          this.classes[i]['assignedBooks'].splice(event.currentIndex, 0, event.previousContainer.data[event.previousIndex]);
          localStorage.setItem('classes', JSON.stringify(this.classes));
          this.exchangeBookToClassStudent(i, event.previousContainer.data[event.previousIndex]);
        }
      } else if (type === 'group') {
        bookISBNs = [];
        if (this.classes[l]['groups'][i]['assignedBooks'] && this.classes[l]['groups'][i]['assignedBooks'][0]) {
          for (let k = 0; k < Object.keys(this.classes[l]['groups'][i]['assignedBooks']).length; k++) {
            bookISBNs.push(this.classes[l]['groups'][i]['assignedBooks'][k].bookISBN);
          }
          if (bookISBNs.indexOf(JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex])).bookISBN) !== -1) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            localStorage.setItem('classes', JSON.stringify(this.classes));
          } else {
            this.classes[l]['groups'][i]['assignedBooks'].splice(event.currentIndex, 0, event.previousContainer.data[event.previousIndex]);
            localStorage.setItem('classes', JSON.stringify(this.classes));
          }
        } else {
          this.classes[l]['groups'][i]['assignedBooks'].push(event.previousContainer.data[event.previousIndex]);
          localStorage.setItem('classes', JSON.stringify(this.classes));
        }
      } else if (type === 'student') {
        bookISBNs = [];
        for (let k = 0; k < Object.keys(this.students[i]['assignedBooks']).length; k++) {
          bookISBNs.push(this.students[i]['assignedBooks'][k].bookISBN);
        }
        if (bookISBNs.indexOf(JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex])).bookISBN) !== -1) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          this.students[i]['assignedBooks'].splice(event.currentIndex, 0, event.previousContainer.data
          [event.previousIndex]);
          localStorage.setItem('students', JSON.stringify(this.students));
        }
      }
    }
  }
  exchangeBookToClassStudent(i, newBook) {
    this.classes[i]['students'].forEach(student => {
        if (student['assignedBooks'].indexOf(newBook) === -1) {
          student['assignedBooks'].push(newBook);
          localStorage.setItem('classes', JSON.stringify(this.classes));
        } else {
          localStorage.setItem('classes', JSON.stringify(this.classes));
        }
    });
  }
  removeBook(i, j) {
    this.classes[i]['assignedBooks'].splice(j, 1);
  }
  bookAssignmentClass(id, i) {
    this.assignBookActiveId[0].type = 'classGroup';
    this.assignBookActiveId[0].id = id;
    this.activeClassIndex = i;
  }
  constructor(private http: HttpClient, public popupService: PopupService, public assignBooks: AssignBooksService) {
    this.getMockData();
  }
  ngOnInit() {
    this.popupService.assignBookType.subscribe(
      subAssignBookType => {
        this.getAssignBookData(subAssignBookType);
        this.clearCheckBoxes();
      }
    );
  }
}
