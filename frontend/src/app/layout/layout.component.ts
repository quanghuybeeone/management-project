import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  user: any;
  userRole: string | null;
  infoUser: any | null;
  apiUrl: string;
  imageUrl: string;

  private appScript!: HTMLScriptElement;

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.apiUrl = this.configService.getApiUrl();
    this.imageUrl = this.configService.getImageUrl();
    this.user = this.authService.getUser();
    this.userRole = this.authService.getUserRole();
    this.loadInfoUser()

  }

  loadInfoUser(){
    this.http
    .get<any>(`${this.apiUrl}users/find/${this.user._id}`)
    .subscribe(
      (response) => {
        this.infoUser = response;
      },
      (error) => {
        console.error('Failed to retrieve user information:', error);
      }
    );
  }

  ngOnInit(): void {
    this.appScript = this.renderer.createElement('script');
    this.appScript.src = 'assets/js/app-script.js';
    this.renderer.appendChild(document.body, this.appScript);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.appScript) {
      this.renderer.removeChild(document.body, this.appScript);
    }
  }
}
