import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginInfo} from '../auth/login-info';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';
import {SingnupInfo} from '../auth/singnup-info';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SingnupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  Successmessage = '';
  fSignup: FormGroup;
  loading = false;

  constructor(private authService: AuthService, private  fb: FormBuilder, private route: Router
  ) {
  }

  ngOnInit() {

    this.fSignup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
    });
  }


  onSubmit() {
    this.loading = true;
    this.signupInfo = new SingnupInfo(
      this.fSignup.get('username').value,
      this.fSignup.get('password').value,
      this.fSignup.get('email').value
    );

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.Successmessage = 'Đăng ký thành công!!';
        this.loading = false;
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        this.loading = true;
        this.isSignUpFailed = true;
        this.isSignedUp = false;
        this.errorMessage = 'Đăng ký thất bại, user hoặc email đã tồn lại';
        this.isSignUpFailed = true;
      }
    );
  }


}
