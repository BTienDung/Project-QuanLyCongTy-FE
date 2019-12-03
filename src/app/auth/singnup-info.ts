export class SingnupInfo {
  username: string;
  password: string;
  email: string;
  roles: string[];


  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.roles = ['user'];
  }
}
