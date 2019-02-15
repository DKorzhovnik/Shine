import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { AuthService } from '../auth/_services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  formGroup: FormGroup;
  showSpinner = true;
  hide = true;
  username: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    this.username = this.formGroup.value.username;
    const password = this.formGroup.value.password;

    this.authService.login(this.username, password).subscribe(
      res => {
        if (res && res.token) {
          this.router.navigate(['home']);
        }
      },
      () => {
        this.formGroup.setErrors({
          auth: 'Invalid username or password'
        });
      },
    );
  }

  getControllError(formControl: FormControl) {
    return formControl.hasError('required')
      ? 'You must enter a value'
      : formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getFormError(formGroup: FormGroup) {
    return formGroup.getError('auth');
  }
}
