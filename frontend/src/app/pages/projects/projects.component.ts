import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member, Project } from './project';
import { ConfigService } from '../../services/config.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})

export class ProjectsComponent implements OnInit {
  projectList: Project[] = [];
  projectListRender: Project[] = [];
  userRole: string | null;
  user: Member | null;

  apiUrl: string;
  imageUrl: string;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number = 0;
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.apiUrl = this.configService.getApiUrl();
    this.imageUrl = this.configService.getImageUrl();
    this.userRole = this.authService.getUserRole();
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.http.get<Project[]>(`${this.apiUrl}projects`).subscribe(
      (response) => {
        if (this.userRole == 'admin') {
          this.projectList = response;
          this.totalItems = this.projectList.length;
          this.filterProjects();
          this.updatePaginatedProjects();
        } else if (this.userRole == 'leader') {
          this.projectList = response.filter(
            (project) => project.leader._id === this.user?._id
          );
          this.totalItems = this.projectList.length;
          this.filterProjects();
          this.updatePaginatedProjects();
        } else {
          this.projectList = response.filter((project) =>
            project.members.some((member) => member._id === this.user?._id)
          );
          this.totalItems = this.projectList.length;
          this.filterProjects();
          this.updatePaginatedProjects();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterProjects() {
    if (this.searchTerm) {
      const filteredProjects = this.projectList.filter((project) =>
        project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.projectListRender = filteredProjects;
      this.totalItems = filteredProjects.length;
    } else {
      this.projectListRender = this.projectList;
      this.totalItems = this.projectList.length;
    }
  }

  updatePaginatedProjects() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.projectListRender = this.projectListRender.slice(startIndex, endIndex);

    if (this.projectListRender.length === 0 && this.currentPage > 1) {
      this.currentPage--;
      const newStartIndex = (this.currentPage - 1) * this.itemsPerPage;
      const newEndIndex = newStartIndex + this.itemsPerPage;
      this.projectListRender = this.projectList.slice(
        newStartIndex,
        newEndIndex
      );
    }
  }

  getPageNumbers() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.filterProjects();
    this.updatePaginatedProjects();
  }

  onNextPage() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.filterProjects();
      this.updatePaginatedProjects();
    }
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterProjects();
      this.updatePaginatedProjects();
    }
  }

  onSearch() {
    this.currentPage = 1;
    this.filterProjects();
    this.updatePaginatedProjects();
  }
}
