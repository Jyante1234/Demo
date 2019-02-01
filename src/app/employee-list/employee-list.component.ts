import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: any[];
  constructor(private http: HttpClient) {
    this.employees = [
      {code:"emp01", name:"Mr.Tom",gender:"Male",annualSalary:5500,dateOfBirth:12-12-2011},
      {code:"emp02", name:"Mr.Alex",gender:"Male",annualSalary:6500,dateOfBirth:12-12-2011},
      {code:"emp03", name:"Mr.Mike",gender:"Male",annualSalary:7500,dateOfBirth:12-12-2011},
      {code:"emp04", name:"Miss.Mary",gender:"Female",annualSalary:5500,dateOfBirth:12-12-2011},
      {code:"emp05", name:"Miss.Nancy",gender:"Female",annualSalary:5500,dateOfBirth:12-12-2011},
      {code:"emp03", name:"Mr.Steve",gender:"Male",annualSalary:7500,dateOfBirth:12-12-2011},
    ];
   }
   getAllEmployeesCount() {
     return this.employees.length;
   }
   getMaleEmployeesCount() {
     return this.employees.filter(e => e.gender === "Male").length;
   }
   getFemaleEmployeesCount() {
     return this.employees.filter(e => e.gender === "Female").length;
   }

   getAllBooks() {
     var access_token = localStorage.getItem('userId')
     this.http.get("http://192.168.0.50:3000/api/mBooks/getbooks?access_token="+access_token+"&userId="+access_token).subscribe(res => {
       console.log("res",res)
     })
   }


  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    showTitle: true,
    title: ['EmpCode','name','gender','Salary','dateOfBirth'],
    useBom: false,
    removeNewLines: true,
    keys: ['code','name','gender','annualSalary','dateOfBirth' ]
  };
 
  ngOnInit() {
    //this.getAllBooks();
  }

}
