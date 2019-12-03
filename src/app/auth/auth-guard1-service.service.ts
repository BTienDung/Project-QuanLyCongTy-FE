import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard1ServiceService {

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
    if (this.authority === 'user' || this.authority === 'admin') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
