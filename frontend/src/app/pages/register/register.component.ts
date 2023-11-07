import { Component, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confPassword = control.get('confPassword');

  if (password && confPassword && password.value !== confPassword.value) {
    return { passwordMismatch: true };
  }

  return null;
};


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  registerForm!: FormGroup;
  fullName!: AbstractControl<any>;

  username: string = '';
  password: string = '';
  private appScript!: HTMLScriptElement;
  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router,private renderer: Renderer2,private formBuilder: FormBuilder, private http: HttpClient) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['', Validators.required],
    }, {
      validators: passwordMatchValidator
    });
  }

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

  register(): void {
    const credentials = {
      username: this.registerForm.value.username,
      name: this.registerForm.value.fullName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.http.post('http://localhost:7777/api/auth/register', credentials).subscribe(
      (response) => {
        this.router.navigate(['/login']);
        this.toastr.success('Đăng ký thành công', 'Success');
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error')
      }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.register();
    }
  }

}
