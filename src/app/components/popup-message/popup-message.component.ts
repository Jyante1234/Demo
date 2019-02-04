import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PopupService } from 'src/provider/popup.service';
import { AssignBooksService } from 'src/provider/assign-books.service';
import { NgForm } from '@angular/forms';
import { ClassService } from 'src/provider/class.service';
@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss']
})
export class PopupMessageComponent implements OnInit {
  pdfUrl: any;
  popupType: string;
  manageClasses: boolean;
  assignBook: boolean;
  alertShow: boolean;
  pdfViewer: boolean;
  confirmationMessage: boolean;
  addStudents: boolean;
  classes = [];
  groups = [];
  students = [];
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
  constructor(public popupService: PopupService, public assignBooks: AssignBooksService,
    public classService: ClassService) {
    this.getMockData();
  }
  getPopupData(popupType) {
    this.manageClasses = this.assignBook = this.pdfViewer = this.confirmationMessage = this.addStudents = false;
    if (popupType === 'manageClasses') {
      this.manageClasses = true;
    } else if (popupType === 'assignBook') {
      this.assignBook = true;
    } else if (popupType === 'confirmationMessage') {
      this.confirmationMessage = true;
    } else if (popupType === 'addStudents') {
      this.addStudents = true;
    } else if (popupType === 'alert') {
      this.alertShow = true;
    } else {
      this.manageClasses = this.assignBook = this.confirmationMessage = this.addStudents = false;
    }
  }
  ngOnInit() {
    this.popupService.popupType.subscribe(
      popupType => {
        this.getPopupData(popupType);
      }
    );
    this.classService.dataUpdated.subscribe(
      dataUpdated => {
        this.getMockData();
      }
    );
  }
}
