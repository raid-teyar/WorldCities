import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../base-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from './RegisterRequest';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RegisterResult } from './RegisterResult';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseFormComponent implements OnInit {
  registerResult?: RegisterResult;

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      // password must at least 8 characters long and contain a number, a lowercase letter, and an uppercase letter and a special character
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ]),
    });
  }

  onSubmit() {
    var request = <RegisterRequest>{};
    request.userName = this.form.controls['userName'].value;
    request.email = this.form.controls['email'].value;
    request.phoneNumber = this.form.controls['phoneNumber'].value;
    request.password = this.form.controls['password'].value;

    this.authService.register(request).subscribe(
      (result) => {
        this.registerResult = result;

        if (result.success) {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.log(error);
        if (error.status == 400) {
          this.registerResult = error.error;
        }
      }
    );
  }
}
