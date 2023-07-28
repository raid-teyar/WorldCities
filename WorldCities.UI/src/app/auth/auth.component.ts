import { Component, OnInit } from '@angular/core';
import { LoginResult } from './LoginResult';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from './LoginRequest';
import { BaseFormComponent } from '../base-form.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends BaseFormComponent implements OnInit {
  loginResult?: LoginResult;
  returnUrl?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    // retrieve the returnUrl from the query parameters
    this.activatedRoute.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/';
    });

    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    var loginRequest = <LoginRequest>{};

    loginRequest.email = this.form.controls['email'].value;
    loginRequest.password = this.form.controls['password'].value;

    this.authService.login(loginRequest).subscribe(
      (result) => {
        console.log(result);

        this.loginResult = result;

        if (result.success) {
          this.router.navigate([this.returnUrl]);
        }
      },
      (error) => {
        console.log(error);

        if (error.status == 401) {
          this.loginResult = error.error;
        }
      }
    );
  }
}
