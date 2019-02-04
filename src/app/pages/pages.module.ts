import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ResourcesComponent } from './resources/resources.component';
import { ComponentsModule } from '../components/components.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GamesComponent } from './games/games.component';
import { EBooksComponent } from './e-books/e-books.component';
import { MatVideoModule } from 'mat-video';
import { Angular2CsvModule } from 'angular2-csv';
import { StudentHomeComponent } from './student-home/student-home.component';
import { ClassesComponent } from './classes/classes.component';

import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { SlideshowModule } from 'ng-simple-slideshow';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { BookTypePipe } from './e-books/book-type.pipe';
import { SharedSpaceComponent } from './shared-space/shared-space.component';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    HomeComponent,
    ResourcesComponent,
    GamesComponent,
    EBooksComponent,
    StudentHomeComponent,
    ClassesComponent,
    BookTypePipe,
    SharedSpaceComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ComponentsModule,
    PdfViewerModule,
    MatVideoModule,
    Angular2CsvModule,
    PdfJsViewerModule,
    SlideshowModule,
    MatCheckboxModule,
    MatIconModule,
    ChartsModule
  ]
})
export class PagesModule { }
