import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Project } from '../projects/project';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private indexScript!: HTMLScriptElement;
  projectList: Project[] = [];
  leaderList: any[] = [];
  employeeList: any[] = [];
  apiUrl: string;
  imageUrl: string;
  constructor(
    private renderer: Renderer2,
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.apiUrl = this.configService.getApiUrl();
    this.imageUrl = this.configService.getImageUrl();
  }

  fetchProjects() {
    this.http.get<Project[]>(`${this.apiUrl}projects`).subscribe(
      (response) => {
          this.projectList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchLeaders() {
    this.http.get<any>(`${this.apiUrl}users/leaders`).subscribe(
      (response) => {
          this.leaderList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchEmployees() {
    this.http.get<any>(`${this.apiUrl}users/employees`).subscribe(
      (response) => {
          this.employeeList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }



  ngOnInit(): void {
    this.indexScript = this.renderer.createElement('script');
    this.indexScript.src = 'assets/js/index.js';
    this.renderer.appendChild(document.body, this.indexScript);
    this.fetchProjects()
    this.fetchLeaders()
    this.fetchEmployees()
  }

  ngOnDestroy() {
    if (this.indexScript) {
      this.renderer.removeChild(document.body, this.indexScript);
    }
  }
}
