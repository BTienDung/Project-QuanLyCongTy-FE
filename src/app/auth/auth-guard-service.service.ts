import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate{
private roles: string[];
private authority: string;
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.tokenStorageService.getAuthorities()) {
      this.roles = this.tokenStorageService.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
        } else if (role === 'ROLE_USER') {
          this.authority = 'user';
        }
      });
    }
    if (this.authority === 'admin' ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
