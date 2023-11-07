import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UsersComponent } from './pages/users/users.component';
import { ProjectdetailComponent } from './pages/projectdetail/projectdetail.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      { path: 'project/:id', component: ProjectdetailComponent },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      // Các route cho các trang khác
    ], canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
