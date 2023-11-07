import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
interface User {
  _id: string;
  name: string;
  role: string;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  apiUrl: string;
  imageUrl: string;
  userList: User[] = [];
  userListRender: User[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';

  constructor(private toastr: ToastrService, private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = this.configService.getApiUrl();
    this.imageUrl = this.configService.getImageUrl();
  }

  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers() {
    this.http.get<User[]>(`${this.apiUrl}users/members`).subscribe(
      (response) => {
        this.userList = response;
        this.totalItems = this.userList.length;
        this.filterUsers();
        this.updatePaginatedUsers();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeRole(userId: string, userRole: string) {
    console.log(userId, userRole);

    const updatedUser = {
      role: userRole === 'employee' ? 'leader' : 'employee',
    };

    this.http.put(`${this.apiUrl}users/${userId}`, updatedUser).subscribe(
      (response) => {
        this.toastr.success('Thay đổi chức vụ thành công!', 'Success');
        this.fetchUsers();
      },
      (error) => {
        console.log('Error updating user role:', error);
      }
    );
  }

  filterUsers() {
    if (this.searchTerm) {
      const filteredProjects = this.userList.filter((project) =>
        project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.userListRender = filteredProjects;
      this.totalItems = filteredProjects.length;
    } else {
      this.userListRender = this.userList;
      this.totalItems = this.userList.length;
    }


  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.userListRender = this.userListRender.slice(startIndex, endIndex);

    if (this.userListRender.length === 0 && this.currentPage > 1) {
      this.currentPage--;
      const newStartIndex = (this.currentPage - 1) * this.itemsPerPage;
      const newEndIndex = newStartIndex + this.itemsPerPage;
      this.userListRender = this.userList.slice(newStartIndex, newEndIndex);
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
    this.filterUsers();
    this.updatePaginatedUsers();
  }

  onNextPage() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.filterUsers();
      this.updatePaginatedUsers();
    }
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterUsers();
      this.updatePaginatedUsers();
    }
  }

  onSearch() {
    this.currentPage = 1;
    this.filterUsers();
    this.updatePaginatedUsers();
  }
}
