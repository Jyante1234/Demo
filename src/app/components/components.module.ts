import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FlashCardComponent } from './flash-card/flash-card.component';
import { PopupComponent } from './popup/popup.component';
import { PopupMessageComponent } from './popup-message/popup-message.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { ClassManagementComponent } from './class-management/class-management.component';
import { AssignBookComponent } from './assign-book/assign-book.component';
import { Angular2CsvModule } from 'angular2-csv';
import { AddStudentsComponent } from './add-students/add-students.component';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule } from '@angular/material';
import { AlertComponent } from './alert/alert.component';
@NgModule({
  declarations: [HeaderComponent, NavigationComponent, MainContentComponent, FlashCardComponent, PopupComponent,
    PopupMessageComponent, FooterComponent, ClassManagementComponent, AssignBookComponent, AddStudentsComponent, AlertComponent],
  imports: [
    CommonModule, RouterModule, MatCheckboxModule, MatIconModule, DragDropModule, MatInputModule, MatProgressSpinnerModule, FormsModule,
    ReactiveFormsModule, PipesModule, HttpModule, RouterModule, Angular2CsvModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatButtonModule
  ],
  exports: [HeaderComponent, NavigationComponent, MainContentComponent, FlashCardComponent, PopupComponent,
    PopupMessageComponent, FooterComponent
  ]
})
export class ComponentsModule { }
