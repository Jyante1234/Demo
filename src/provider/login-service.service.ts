import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  mockData: any;
  loginResponse: any;
  mockDataJSON = 'assets/mockData/mockData.json';
  loginResponseJSON = 'assets/mockData/loginResponse.json';
  loggedIn: boolean;
  userData = [];
  statusResponse: any;
  @Output() checkLogin: EventEmitter<boolean> = new EventEmitter();
  @Output() loginStatusMessage: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) { }

  public getMockData(): any {
    return this.http.get(this.mockDataJSON);
  }
  public getLoginResponse(): any {
    return this.http.get(this.loginResponseJSON);
  }
  loginFormSubmit(loginFormValue): any {
    const body = new URLSearchParams();
    body.set('email', loginFormValue.loginEmail);
    body.set('password', loginFormValue.loginPassword);
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
    this.http.post(environment.localLoginUrl, body.toString(), httpOptions).subscribe(
      data => {
        this.userData = data as string [];
        if (this.userData[0].statusCode === 200) {
          this.checkIfLogin(true, this.userData);
        } else {

        }
      }, err => {}, () => {
        this.loginStatusMessage.emit(this.userData[0].statusMessage);
      }
    );
  }
  localLoginFormSubmit(loginFormValue) {
    this.http.get(this.mockDataJSON).subscribe(
      data => {
        this.mockData = data as string[];
        console.log('login:',this.mockData);
        this.http.get(this.loginResponseJSON).subscribe(
          data2 => {
            this.loginResponse = data2 as string[];
            
            if (loginFormValue.loginEmail === this.mockData['login'][0].email
            && loginFormValue.loginPassword === this.mockData['login'][0].password) {
              //console.log(loginFormValue);;
              //console.log('form value:', loginFormValue.loginEmail);
              this.checkIfLogin(true, this.loginResponse[0]);
              localStorage.setItem("userName",this.loginResponse[0]['user'][0].userName);
              this.loginStatusMessage.emit(this.loginResponse[0].statusMessage);

            } else if (loginFormValue.loginEmail === this.mockData['login'][1].email
            && loginFormValue.loginPassword === this.mockData['login'][1].password) {
              this.checkIfLogin(true, this.loginResponse[1]);
              localStorage.setItem("userName",this.loginResponse[1]['user'][0].userName);
              this.loginStatusMessage.emit(this.loginResponse[1].statusMessage);
            } 
            else if (loginFormValue.loginEmail === this.mockData['login'][2].email
            && loginFormValue.loginPassword === this.mockData['login'][2].password) {
              this.checkIfLogin(true, this.loginResponse[2]);
              localStorage.setItem("userName",this.loginResponse[2]['user'][0].userName);
              this.loginStatusMessage.emit(this.loginResponse[2].statusMessage);
            } 
            else if (loginFormValue.loginEmail === this.mockData['login'][3].email
            && loginFormValue.loginPassword === this.mockData['login'][3].password) {
              this.checkIfLogin(true, this.loginResponse[3]);
              localStorage.setItem("userName",this.loginResponse[3]['user'][0].userName);
              this.loginStatusMessage.emit(this.loginResponse[3].statusMessage);
            }  
            // else   {
            //   this.checkIfLogin(false, this.loginResponse[4]);
            //   console.log(this.loginResponse[4]);
            //   this.loginStatusMessage.emit(this.loginResponse[4].statusMessage);
            // }
            else {
              this.loginStatusMessage.emit(this.loginResponse[5].statusMessage);
            }
          }
        );
      }
    );
  }
  checkIfLogin(value, userData) {
    if (Object.keys(userData).length !== 0) {
      if (Object.keys(userData['user']).length !== 0) {
        localStorage.setItem('userData', JSON.stringify(userData));
        this.checkLogin.emit(value);
      } else {
        localStorage.removeItem('userData');
        this.checkLogin.emit(false);
      }
    } else {
      localStorage.removeItem('userData');
      this.checkLogin.emit(value);
    }
  }
}
