import { ErrorProvider } from './../../common/provider/error.provider';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignUpRequestPayload } from './../../model/app.model';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpRequestPayload: SignUpRequestPayload;
  signupForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private builder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.signUpRequestPayload = {
      email: '',
      password: '',
      username: '',
    };
  }

  ngOnInit(): void {
    this.signupForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  signup() {
    this.signUpRequestPayload.email = this.signupForm.get('email').value;
    this.signUpRequestPayload.username = this.signupForm.get('username').value;
    this.signUpRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signUp(this.signUpRequestPayload).subscribe({
      next: (_) =>
        this.router.navigate(['/login'], { queryParams: { registered: true } }),
      error: (error) => {
        console.log(error);
        this.toastr.error('Registration Failed. Please Try Again.');
      },
    });
  }

  showError(controlName: string) {
    return ErrorProvider.showError(controlName, this.signupForm);
  }
}
