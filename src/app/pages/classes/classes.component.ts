import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginServiceService } from 'src/provider/login-service.service';
import { PopupService } from 'src/provider/popup.service';
import { ClassService } from 'src/provider/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  mockDataJSON = 'assets/mockData/mockClassManagement.json';
  classes = [];
  groups = [];
  students = [];
  classStudentReportGetById: object = {};
  public getMockData() {
    if (!JSON.parse(localStorage.getItem('classes')) || !JSON.parse(localStorage.getItem('classes'))[0]) {
      this.http.get(this.mockDataJSON).subscribe(
        data => {
          this.classes = data['classes'];
          localStorage.setItem('classes', JSON.stringify(this.classes));
        }
      );
    } else {
      this.classes = JSON.parse(localStorage.getItem('classes'));
    }
    if (!JSON.parse(localStorage.getItem('groups')) || !JSON.parse(localStorage.getItem('groups'))[0]) {
      this.http.get(this.mockDataJSON).subscribe(
        data => {
          this.groups = data['groups'];
          localStorage.setItem('groups', JSON.stringify(this.groups));
        }
      );
    } else {
      this.groups = JSON.parse(localStorage.getItem('groups'));
    }
    if (!JSON.parse(localStorage.getItem('students')) || !JSON.parse(localStorage.getItem('students'))[0]) {
      this.http.get(this.mockDataJSON).subscribe(
        data => {
          this.students = data['students'];
          localStorage.setItem('students', JSON.stringify(this.students));
        }
      );
    } else {
      this.students = JSON.parse(localStorage.getItem('students'));
    }
    // this.classes = JSON.parse(localStorage.getItem('classes'));
  }
  constructor(private http: HttpClient, public loginService: LoginServiceService, public popupService: PopupService,
    public classService: ClassService) { }
  openPopup(type: string) {
    this.popupService.setPopupState(true);
    this.popupService.setPopupType(type);
  }
  assignBook(type, id) {
    const obj = [{
      'id': id,
      'type': type
    }];
    localStorage.setItem('assignBookActiveId', JSON.stringify(obj));
    this.popupService.setAssignBookType(type);
  }
  openReport(reportType, id) {
    this.popupService.setReportType(reportType);
    this.popupService.setPopupDescription(id);
  }
  openAlert(alertType, id) {
    this.popupService.setAlertType(alertType);
    this.popupService.setPopupDescription(id);
  }
  ngOnInit() {
    this.getMockData();
    this.classService.dataUpdated.subscribe(
      dataUpdated => {
        this.getMockData();
      }
    );
  }

}
