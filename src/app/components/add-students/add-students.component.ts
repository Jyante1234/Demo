import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupService } from 'src/provider/popup.service';
import { ClassService } from 'src/provider/class.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss']
})
export class AddStudentsComponent implements OnInit {
  classes = [];
  groups = [];
  students = [];
  dataSource: any;
  columnsToDisplay: any;
  showAddStudents: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  mockAvatars = 'assets/mockData/mockAvatars.json';
  avatars = [];
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
      this.updateTable();
    } else {
      this.students = [];
      this.updateTable();
    }
    this.http.get(this.mockAvatars).subscribe(
      data => {
        this.avatars = data['avatars'];
      }
    );
  }
  openPopup(type: string) {
    this.popupService.setPopupState(true);
    this.popupService.setPopupType(type);
  }
  updateStudents() {
    this.updateTable();
  }
  saveStudents() {
    localStorage.setItem('students', JSON.stringify(this.students));
    this.updateTable();
  }
  saveCloseStudents() {
    localStorage.setItem('students', JSON.stringify(this.students));
    this.popupService.setPopupState(false);
    this.classService.updateData(true);
  }
  addStudentRow() {
    const a = {
      'firstName' : 'First Name',
      'lastName' : 'Last Name',
      'userName' : 'username',
      'password' : 'Password',
      'avatar' : 'assets/images/snorlax.png',
      'assignedBooks': [],
      'bookstats' : {
        'eBooksRead': 'Red',
        'totalActivities': '12',
        'completedActivities': '5',
        'totalGames': '12',
        'completedGames': '5',
        'timeOnBook': {
          'min': '12',
          'sec': '00'
        },
        'practiceGameScore': '10'
      },
      'studentId': Math.random().toString(36).substring(7)
    };
    this.students.unshift(a);
    this.updateTable();
  }
  updateTable() {
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  deleteStudent(i) {
    this.students.splice(i, 1);
    this.updateTable();
  }
  constructor(private http: HttpClient, public popupService: PopupService, public classService: ClassService) {
  }

  ngOnInit() {
    this.columnsToDisplay = ['firstName', 'lastName', 'userName', 'password', 'avatar', 'delete'];
    this.getMockData();
    this.classService.dataUpdated.subscribe(
      dataUpdated => {
        this.getMockData();
      }
    );
  }

}
