import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any;
  infoUser: any | null;
  infoChangePassword={ oldPassword: '', newPassword: '' , confPassword: '' };
  apiUrl: string;
  imageUrl: string;
  @Output() onUpdateProfile: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.apiUrl = this.configService.getApiUrl();
    this.imageUrl = this.configService.getImageUrl();
    this.user = this.authService.getUser();
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.http.get<any>(`${this.apiUrl}users/find/${this.user._id}`).subscribe(
      (response) => {
        this.infoUser = response;
        // console.log(this.infoUser);
      },
      (error) => {
        console.error('Failed to retrieve user information:', error);
      }
    );
  }

  updateUserInfo() {
    this.http
      .put<any>(`${this.apiUrl}users/${this.infoUser._id}`, this.infoUser)
      .subscribe(
        (response) => {
          this.toastr.success(response.message, 'Success');
          setTimeout(() => {
            location.reload(); // Tải lại trang sau 2 giây
          }, 2000);
        },
        (error) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
  }

  uploadImage(file: File) {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const fileName = `${timestamp}_${file.name}`;

    const formData = new FormData();
    formData.append('one_image', file, fileName);

    this.http.post<any>(`${this.apiUrl}file/upload`, formData).subscribe(
      (response) => {
        // Xử lý phản hồi thành công từ API (nếu cần)
        console.log(response);
        this.infoUser.avatar = response.filename;
        this.updateUserInfo();
      },
      (error) => {
        // Xử lý lỗi từ API (nếu cần)
        console.error(error);
        this.toastr.error('Failed to upload image', 'Error');
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadImage(file);
  }

  changepassword() {
    console.log(this.infoChangePassword);
    if(this.infoChangePassword.newPassword == this.infoChangePassword.confPassword && this.infoChangePassword.newPassword!=''){
      this.http
            .put<any>(
              `${this.apiUrl}auth/changepassword/${this.infoUser._id}`,
              this.infoChangePassword
            )
            .subscribe(
              (response) => {
                this.toastr.success(response.message, 'Success');
              },
              (error) => {
                this.toastr.error(error.error.message, 'Error');
              }
            );
    }


  }
}
