import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule,DatePipe,AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UsersComponent } from './pages/users/users.component';

import { AddnewprojectComponent } from './pages/projects/components/addnewproject/addnewproject.component';
import { EditprojectComponent } from './pages/projects/components/editproject/editproject.component';
import { SelectMemberComponent } from './pages/projects/components/select-member/select-member.component';
import { ProjectdetailComponent } from './pages/projectdetail/projectdetail.component';
import { AddnewtaskComponent } from './pages/projectdetail/components/addnewtask/addnewtask.component';
import { EdittaskComponent } from './pages/projectdetail/components/edittask/edittask.component';
import { DeteleProjectComponent } from './pages/projects/components/detele-project/detele-project.component';
import { DeteleTaskComponent } from './pages/projectdetail/components/detele-task/detele-task.component';

import { AuthGuard } from './guards/auth-guard.guard';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    LayoutComponent,
    PagenotfoundComponent,
    ProjectsComponent,
    UsersComponent,
    AddnewprojectComponent,
    EditprojectComponent,
    SelectMemberComponent,
    ProjectdetailComponent,
    AddnewtaskComponent,
    EdittaskComponent,
    DeteleProjectComponent,
    DeteleTaskComponent,
    TestComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
    HttpClientModule,
    MatAutocompleteModule,
    DragDropModule
  ],
  providers: [
    DatePipe,
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
