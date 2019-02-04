import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  classes = JSON.parse(localStorage.getItem('classes'));
  groups = JSON.parse(localStorage.getItem('groups'));
  students = JSON.parse(localStorage.getItem('students'));
  @Output() dataUpdated: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  updateData(value: boolean) {
    this.dataUpdated.emit(value);
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
}
