import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {LoginInfo} from '../auth/login-info';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  successMessage = '';
  roles: string[] = [];
  private loginInfo: LoginInfo;
  formLogin: FormGroup;
   loading = false;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private fb: FormBuilder, private route: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  onSubmit() {
    this.loading = true;
    if (this.formLogin.valid) {

      this.loginInfo = new LoginInfo(
        this.formLogin.get('username').value,
        this.formLogin.get('password').value);
      this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);

          // this.successMessage = '';
          this.isLoginFailed = true;
          this.roles = this.tokenStorage.getAuthorities();
          this.loading = false;
          this.roles.every(role => {
            if (role === 'ROLE_ADMIN') {
              this.route.navigate(['/company/list']);
            } else if (role === 'ROLE_USER') {
              this.route.navigate(['/user/' + this.tokenStorage.getUsername()]);
            }
          });
        },
        error => {
          this.loading = true;
          this.errorMessage = 'Tai khoan mat khau khong dung!!!';
          this.isLoginFailed = false;
        }
      );
    }
  }
}


