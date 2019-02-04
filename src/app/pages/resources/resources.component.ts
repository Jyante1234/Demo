import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourceServiceService } from '../../../provider/resource-service.service';

import { HttpClient  } from '@angular/common/http';
// import 'rxjs/add/operator/map';
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  pdfSrc: any;
  show = false;
  showPdf = false;
  resourceMockData: any = [];
  folderName: string;
  constructor(private resourceServiceService: ResourceServiceService, private http: HttpClient) { }
  onShow(mockData: any) {
    this.pdfSrc = mockData.pdfUrl;
    this.show = !this.show;
  }
  openPdf() {
    this.showPdf = !this.showPdf;
  }
  getResourceMockData() {
    this.resourceServiceService.getResourceMockData().subscribe(res => {
      this.resourceMockData = res['resourceMockData'];
    });
  }

  openFile(file) {
    console.log('file:',file);
  }
  ngOnInit() {
    this.getResourceMockData();
  }

}
