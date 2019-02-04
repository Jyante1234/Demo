import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './pages/home/home.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { GamesComponent } from './pages/games/games.component';
import { EBooksComponent } from './pages/e-books/e-books.component';
import { StudentHomeComponent } from './pages/student-home/student-home.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { SharedSpaceComponent } from './pages/shared-space/shared-space.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'student', component: StudentHomeComponent},
  {path: 'resources', component: ResourcesComponent},
  {path: 'games', component: GamesComponent},
  {path: 'ebooks', component: EBooksComponent},
  {path: 'classes', component: ClassesComponent},
  {path: 'shared-space', component: SharedSpaceComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes), PagesModule, ComponentsModule, AuthModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
