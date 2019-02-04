import { Component, OnInit, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopupService } from 'src/provider/popup.service';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ClassService } from 'src/provider/class.service';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.scss']
})
export class ClassManagementComponent implements OnInit {
  @ViewChildren ('changeClassNameShow') changeClassNameShows;
  classesCollapseList = [];
  groupsCollapseList = [];
  studentsCollapseList = [];
  classes = [];
  groups = [];
  students = [];
  abc: any;
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
  openPopup(type: string) {
    this.popupService.setPopupState(true);
    this.popupService.setPopupType(type);
  }
  addResource(type, nameForm: NgForm, nameFormValue) {
    if (type === 'class') {
      const obj = {
        'assignedBooks': [],
        'classId': Math.random().toString(36).substring(7),
        'groupIds': [],
        'groups': [],
        'groupStudentIds': [],
        'name': nameFormValue.classNameInput,
        'students': [],
        'studentIds': []
      };
      this.classes.push(obj);
      this.classManagementIds();
      localStorage.setItem('classes', JSON.stringify(this.classes));
    } else if (type === 'group') {
      const obj = {
        'assignedBooks': [],
        'groupId': Math.random().toString(36).substring(7),
        'name': nameFormValue.groupNameInput,
        'students': [],
        'studentIds': []
      };
      this.groups.push(obj);
      this.classManagementIds();
      localStorage.setItem('groups', JSON.stringify(this.groups));
    }
    nameForm.resetForm();
  }
  classManagement(type, event: CdkDragDrop<string[]>, i) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (type === 'class') {
        const a = event.previousContainer.data[event.previousIndex];
        if (this.classes[i]['groupIds'].indexOf(JSON.parse(JSON.stringify(a)).groupId) === -1) {
          this.classes[i]['groupIds'].push(JSON.parse(JSON.stringify(a)).groupId);
          for (let j = 0; j < a['studentIds'].length; j++) {
            this.classes[i]['groupStudentIds'].push(a['studentIds'][j]);
          }
          this.maintainGroups();
        } else {}
      } else if (type === 'group') {
        const arr = [];
        this.groups[i]['students'].forEach(element => {
          arr.push(element.studentId);
        });
        const b = JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex]));
        if (arr.indexOf(b.studentId) !== -1) {
        } else {
          this.groups[i]['students'].splice(event.currentIndex, 0, event.previousContainer.data[event.previousIndex]);
          if (this.groups[i]['studentIds'].indexOf(b.studentId) === -1) {
            this.groups[i]['studentIds'].push(b.studentId);
          }
          localStorage.setItem('groups', JSON.stringify(this.groups));
          this.maintainGroups();
        }
      } if (type === 'student') {
        const a = JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex]));
        if (this.classes[i]['studentIds'].indexOf(a.studentId) !== -1) {
        } else {
          this.classes[i]['studentIds'].splice(event.currentIndex, 0, a.studentId);
          localStorage.setItem('classes', JSON.stringify(this.classes));
          this.classService.maintainStudents();
        }
      }
    }
  }
  maintainGroups() {
    for (let i = 0; i < this.classes.length; i++) {
      this.classes[i]['groups'] = [];
      if (this.classes[i]['groupIds'].length) {
        for (let j = 0; j < this.classes[i]['groupIds'].length; j++) {
          const a = this.groups.filter(x => x.groupId === this.classes[i]['groupIds'][j])[0];
          if (a) {
            this.classes[i]['groups'].push(a);
            localStorage.setItem('classes', JSON.stringify(this.classes));
            if (j < this.classes[i]['groupIds'].length) {
              this.maintainStudents();
            }
          } else {
            this.classes[i]['groupIds'].splice(j, 1);
            j--;
            this.maintainStudents();
            localStorage.setItem('classes', JSON.stringify(this.classes));
          }
        }
      } else {
        this.maintainStudents();
      }
    }
  }
  maintainStudents() {
    for (let i = 0; i < this.classes.length; i++) {
      this.classes[i]['students'] = [];
      for (let j = 0; j < this.classes[i]['studentIds'].length; j++) {
        this.classes[i]['students'].push(this.students.filter(x => x.studentId === this.classes[i]['studentIds'][j])[0]);
        if (j === (this.classes[i]['studentIds'].length - 1)) {
          for (let k = 0; k < this.classes[i]['groupStudentIds'].length; k++) {
            if (this.classes[i]['groupStudentIds'].indexOf(this.classes[i]['studentIds']) === -1) {
              this.classes[i]['students'].push(this.students.filter(x => x.studentId === this.classes[i]['groupStudentIds'][j])[0]);
            }
          }
        }
      }
      localStorage.setItem('classes', JSON.stringify(this.classes));
    }
  }
  classManagementIds() {
    this.classes.forEach(element => {
      this.classesCollapseList.push('classesCollapseList_' + element.classId);
      this.studentsCollapseList.push('studentsClassCollapseList_' + element.classId);
    });
    this.groups.forEach(group => {
      this.groupsCollapseList.push('groupsCollapseList_' + group.groupId);
      this.studentsCollapseList.push('groupsCollapseList_' + group.groupId);
    });
  }
  nameManagement(type, idi, nameForm) {
    if (type === 'class') {
      this.classes[idi].name = nameForm.newClassName;
      localStorage.setItem('classes', JSON.stringify(this.classes));
    } else if (type === 'group') {
      for (let i = 0; i < this.groups.length; i++) {
        if (this.groups[i].groupId === idi) {
          this.groups[i].name = nameForm.newGroupName;
          localStorage.setItem('groups', JSON.stringify(this.groups));
          this.maintainGroups();
        }
      }
    } else if (type === 'student') {
      for (let i = 0; i < this.students.length; i++) {
        if (this.students[i].studentId === idi) {
          this.students[i].name = nameForm.newStudentName;
          for (let j = 0; j < this.groups.length; j++) {
            for (let k = 0; k < this.groups[j]['students'].length; k++) {
              if (this.groups[j]['students'][k].studentId === this.students[i].studentId) {
                this.groups[j]['students'][k].name = this.students[i].name;
                localStorage.setItem('groups', JSON.stringify(this.groups));
                localStorage.setItem('students', JSON.stringify(this.students));
                this.maintainGroups();
              } else {}
            }
          }
        }
      }
    }
  }
  removeManagement(type, idi, j) {
    if (type === 'group') {
      this.classes[idi]['groupIds'].splice(j, 1);
      this.classes[idi]['groups'].splice(j, 1);
      this.maintainGroups();
      localStorage.setItem('groups', JSON.stringify(this.groups));
    } else if (type === 'studentGroup') {
      for (let i = 0; i < this.groups.length; i++) {
        if (this.groups[i].groupId === idi) {
          this.groups[i]['students'].splice(j, 1);
          this.maintainGroups();
          localStorage.setItem('groups', JSON.stringify(this.groups));
        } else {
          localStorage.setItem('groups', JSON.stringify(this.groups));
        }
      }
    } else if (type === 'studentClass') {
      this.classes[idi]['students'].splice(j, 1);
      localStorage.setItem('classes', JSON.stringify(this.classes));
    }
  }
  deleteManagement(type, i) {
    if (type === 'class') {
      this.classes.splice(i, 1);
      localStorage.setItem('classes', JSON.stringify(this.classes));
    } else if (type === 'group') {
      this.groups.splice(i, 1);
      this.maintainGroups();
      localStorage.setItem('groups', JSON.stringify(this.groups));
    } else if (type === 'student') {
      this.students.splice(i, 1);
      for (let j = 0; j < this.groups['length']; j++) {
        for (let k = 0; k < this.groups[j]['students'].length; k++) {
          if (this.students.indexOf(this.groups[j]['students'][k]) === -1) {
            this.groups[j]['students'].splice(k, 1);
            localStorage.setItem('students', JSON.stringify(this.students));
          }
        }
        this.maintainGroups();
      }
    }
  }
  constructor(private http: HttpClient, public popupService: PopupService, public classService: ClassService) {
    this.getMockData();
  }
  ngOnInit() {
    this.classManagementIds();
  }
}
