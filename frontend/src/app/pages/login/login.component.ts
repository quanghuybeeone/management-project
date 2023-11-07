import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  private appScript!: HTMLScriptElement;
  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router,private renderer: Renderer2) {}

  ngOnInit(): void {
    this.appScript = this.renderer.createElement('script');
    this.appScript.src = 'assets/js/app-script.js';
    this.renderer.appendChild(document.body, this.appScript);
  }

  ngOnDestroy() {
    if (this.appScript) {
      this.renderer.removeChild(document.body, this.appScript);
    }
  }

  login(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe(
      (response) => {
        // console.log(response);
        let token = response.access_token;
        if (token) {
          this.authService.setAccessToken(token);
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error')
      }
    );
  }
}
