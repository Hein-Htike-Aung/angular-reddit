import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { ErrorProvider } from './../../common/provider/error.provider';
import { LoginRequestPayload } from './../../model/app.model';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginRequestPayload: LoginRequestPayload;
  loginForm: FormGroup;
  registerSuccessMessage: string;

  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginRequestPayload = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (
        params['registered'] !== undefined &&
        params['registered'] === 'true'
      ) {
        this.toastr.success('Activate your account before you login');
      }
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe({
      next: (_) => {
        this.router.navigateByUrl('');
        this.toastr.success('Login Successful');
      },
      error: (error) => {
        this.toastr.error('Login Failed. Please check your credential');
        throwError(() => error);
      },
    });
  }

  showError(controlName: string) {
    return ErrorProvider.showError(controlName, this.loginForm);
  }
}
