import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:7777/api/auth'; // Thay thế bằng URL của API đăng nhập

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    // Gửi yêu cầu đăng nhập đến API
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  setAccessToken(token: string): void {
    // Lưu token vào cookies
    document.cookie = `access_token=${token}; Path=/`;
  }

  getAccessToken(): string | null {
    // Lấy token từ cookies
    const name = 'access_token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArr = decodedCookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
      let cookie = cookieArr[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  decodeToken(token: string): any {
    // Giải mã token JWT
    return jwt_decode(token);
  }

  isAuthenticated(): boolean {
    // Kiểm tra xem người dùng đã xác thực hay chưa
    const token = this.getAccessToken();
    return token !== null && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    // Kiểm tra xem token đã hết hạn hay chưa
    const decoded: any = this.decodeToken(token);
    if (decoded && decoded.exp) {
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decoded.exp);
      return expirationDate < new Date();
    }
    return false;
  }

  hasRole(role: string): boolean {
    // Kiểm tra xem người dùng có vai trò đã chỉ định hay không
    const token = this.getAccessToken();
    if (token) {
      const decoded: any = this.decodeToken(token);
      if (decoded && decoded.role) {
        return decoded.role === role;
      }
    }
    return false;
  }

  getUser(): { _id: string, name: string } | null {
    // Lấy thông tin người dùng từ token
    const token = this.getAccessToken();
    if (token) {
      const decoded: any = this.decodeToken(token);

      if (decoded && decoded.id && decoded.name) {
        return {
          _id: decoded.id,
          name: decoded.name
        };
      }
    }
    return null;
  }

  getUserRole(): string | null {
    const token = this.getAccessToken();
    if (token) {
      const decoded: any = this.decodeToken(token);

      if (decoded && decoded.role) {
        return decoded.role;
      }
    }
    return null;
  }

  logout(): void {
    // Xóa token khỏi cookies
    document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
