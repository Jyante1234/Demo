import { Component, OnInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
  @ViewChildren('window') window;
  currentWindowNo: any;
  windowSrcs = [
    {
      'windowSrcNo' : '1',
      'windowSrc' : '/assets/images/window.png'
    },
    {
      'windowSrcNo' : '2',
      'windowSrc' : '/assets/images/stage.png'
    },
    {
      'windowSrcNo' : '3',
      'windowSrc' : '/assets/images/stage.png'
    }
  ];
  constructor() { }
  findCurrentWindow() {
    if (parseInt(localStorage.getItem('windowSrcNo'), 10) < Object.keys(this.windowSrcs).length) {
      let currentWindow = parseInt(localStorage.getItem('windowSrcNo'), 10);
      return currentWindow++;
    } else {
      return '1';
    }
  }
  changeWindow(window) {
    this.currentWindowNo = this.findCurrentWindow();
    localStorage.setItem('windowSrcNo', this.currentWindowNo);
    console.log(window);
    window.src = this.windowSrcs.find(x => x.windowSrcNo === this.currentWindowNo).windowSrc;
  }
  ngOnInit() {
    if (localStorage.getItem('windowSrcNo')) {
      localStorage.getItem('windowSrcNo');
      this.changeWindow(window);
    } else {
      localStorage.setItem('windowSrcNo', '1');
      this.changeWindow(window);
    }
  }

}
