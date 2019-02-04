import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/provider/popup.service';
import { ClassService } from 'src/provider/class.service';
import { Http } from '@angular/http';
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  popupWindow = false;
  popupType: string;
  popupName: string;
  gameUrl: string;
  videoUrl: string;
  popupUrl: any;
  element: HTMLImageElement;
  mockNotification = [];
  popupDesc: any;
  showOptions = false;
  classStudentAlertShow = false;
  studentReport = [];
  groupReport = [];
  sudentReportStats: any;
  popupWhichType: string;
  classStudentReport = false;
  groupStudentAlertShow = false;
  classReportShow = false;
  groupReportShow = false;
  groupStudentReportShow = false;
  gameUrlShow = false;
  videoUrlShow = false;
  classReport: any;
  popupNameAndType: string;
  mockDataJSON = 'assets/mockData/mockNotification.json';
  progressReportShow = false;
  parentReportShow = true;
  popupWindowBody: boolean;
  videoPopup: boolean;
  closePopUp() {
    this.popupService.setPopupState(false);
    this.classService.updateData(true);
  }
  expandPopupVar: boolean = false;
  expandPopup() {
    this.expandPopupVar =! this.expandPopupVar;
    if (this.expandPopupVar == true) {
      const expand = document.getElementsByClassName('popupWindow');
    expand[0].classList.add('fullscreen');
    } else {
      const expand = document.getElementsByClassName('popupWindow');
      expand[0].classList.remove('fullscreen');
    }
    setTimeout(() => {
      
    }, 1000);
    
  }
  getNotificationData() {
    this.http.get(this.mockDataJSON).subscribe(
      res => {
        this.mockNotification = res.json();
      });
  }
  openProgressReport() {
    this.progressReportShow = false;
    this.parentReportShow = true;
  }
  openParentReport() {
    this.parentReportShow = false;
    this.progressReportShow = true;
  }
  transFormUrl(url) {
    console.log(url);
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  constructor(public popupService: PopupService, public classService: ClassService, private http: Http, public domSanitizer: DomSanitizer) { }
  ngOnInit() {
    this.popupService.popupState.subscribe(
      popupState => {
        this.popupWindow = popupState;
      }
    );
    this.popupService.popupType.subscribe(
      popupType => {
        this.popupWindowBody = false;
        this.videoPopup = false;
        if (popupType === 'manageClasses') {
          this.popupName = 'Build Classes';
          this.gameUrlShow = false;
          this.videoUrlShow = false;
        } else if (popupType === 'assignBook') {
          this.popupName = 'Assign Book';
          this.gameUrlShow = false;
          this.videoUrlShow = false;
        } else if (popupType === 'classStudentAlert') {
          this.popupName = 'Alert';
          this.popupWindowBody = true;
          this.gameUrlShow = false;
          this.videoUrlShow = false;
        } else if (popupType === 'classStudentReport') {
          this.popupName = 'Report';
          this.popupWindowBody = true;
          this.gameUrlShow = false;
          this.videoUrlShow = false;
        } else if (popupType === 'studentHome') {
          this.popupName = 'Student Home';
          this.gameUrlShow = false;
          this.videoUrlShow = false;
        } else if (popupType === 'addStudents') {
          this.popupName = 'Add Students';
          this.gameUrlShow = false;
          this.videoUrlShow = false;
        } else if (popupType === 'classReport') {
          this.popupName = 'Report';
          this.popupWindowBody = true;
          this.gameUrlShow = false;
          this.videoUrlShow = false;
        } else if (popupType === 'game') {
          this.popupName = 'Game';
          this.popupWindowBody = true;
          this.gameUrlShow = true;
          this.videoUrlShow = false;
        } else if (popupType === 'video') {
          this.popupName = 'Video';
          this.popupWindowBody = true;
          this.gameUrlShow = false;
          this.videoUrlShow = true;
        }
      }
    );
    this.popupService.reportType.subscribe(
      reportType => {
        if (reportType === 'classReport') {
          this.classReportShow = true;
          this.classStudentAlertShow = this.classStudentReport = this.groupReportShow = this.groupStudentReportShow =
            this.groupStudentAlertShow = this.classStudentAlertShow = this.gameUrlShow = this.videoUrlShow = false;
        } else if (reportType === 'classStudentReport') {
          this.classStudentReport = true;
          this.classStudentAlertShow = this.classReportShow = this.groupReportShow = this.groupStudentReportShow =
            this.groupStudentAlertShow = this.classStudentAlertShow = this.gameUrlShow = this.videoUrlShow = false;
        } else if (reportType === 'groupReport') {
          this.groupReportShow = true;
          this.classReportShow = this.classStudentAlertShow = this.classStudentReport = this.groupStudentReportShow =
            this.groupStudentAlertShow = this.classStudentAlertShow = this.gameUrlShow = this.videoUrlShow = false;
        } else if (reportType === 'groupStudentReport') {
          this.groupStudentReportShow = true;
          this.classStudentReport = this.classStudentAlertShow = this.classReportShow = this.groupReportShow = this.groupStudentAlertShow =
            this.classStudentAlertShow = this.gameUrlShow = this.videoUrlShow = false;
        }
      }
    );
    this.popupService.alertType.subscribe(
      popupType => {
        if (popupType === 'classStudentAlert') {
          this.classStudentAlertShow = true;
          this.groupStudentAlertShow = this.classStudentReport = this.classReportShow = this.groupReportShow = this.groupStudentReportShow
            = this.gameUrlShow = this.videoUrlShow = false;
        } else if (popupType === 'groupStudentAlert') {
          this.groupStudentAlertShow = true;
          this.classStudentAlertShow = this.classStudentReport = this.classReportShow = this.groupReportShow = this.groupStudentReportShow
            = this.gameUrlShow = this.videoUrlShow = false;
        }
      }
    );
    this.popupService.popupDescription.subscribe(
      popupDesc => {
        this.studentReport = popupDesc;
        this.groupReport = popupDesc;
        console.log(popupDesc);
      }
    );
    this.popupService.gameType.subscribe(
      gameType => {
        if (gameType === 'game') {  
           this.gameUrlShow == true;
          this.groupStudentAlertShow = this.classStudentReport = this.classReportShow = this.groupReportShow = this.groupStudentReportShow
            =  this.classStudentAlertShow = false;
        } 
      }
    );
    this.popupService.popupGameUrl.subscribe(
      gameUrl => {
        this.gameUrl = gameUrl;
        console.log('in popup',this.gameUrl);
      }
    );
    this.popupService.videoType.subscribe(
      videoType => {
        if (videoType === 'video') {
           this.gameUrlShow = false;
           this.videoUrlShow = true;
          this.groupStudentAlertShow = this.classStudentReport = this.classReportShow = this.groupReportShow = this.groupStudentReportShow
            =  this.classStudentAlertShow = false;
        } 
      }
    );
    this.popupService.popupVideoUrl.subscribe(
      videoUrl => {
        this.videoUrl = videoUrl;
        this.videoPopup = true;
        // const expand = document.getElementsByClassName('popupWindow');
        // expand[0].classList.add('fullscreen');
        // const myVideo = document.getElementsByClassName('fullscreen1') as HTMLCollectionOf<HTMLElement>
        //   for(var i = 0; i <= myVideo.length;  i++) {
        //     myVideo[i].style["background-color"] = 'black';
        //     myVideo[i].style["width"] = "700px";
        //     myVideo[i].style["height"] = "450px";
        //     }
           // myVideo[0].classList.remove('fullscreen');
        // console.log('in popup',this.videoUrl);
      }
    );
    this.getNotificationData();
  }

}
