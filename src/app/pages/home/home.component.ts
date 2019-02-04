import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  disableSwiping: boolean = true;
  employee = {};
  constructor() {
  }
 
  ngOnInit() {
    $('.carousel').carousel({
      interval: 5000,
      pause: "false"
    });
  }

}
