import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {UserServiceService} from './user-service.service';
import {User} from './user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpEvent, HttpEventType} from '@angular/common/http';

const urlImgUser = 'http://localhost:8080/images/';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  info: any;
  username: string;
  user: User;
  file: any;
  formUser: FormGroup;
  messageImg;
  messageSuccess;
  messageFail;
  formData = new FormData();
  loading = false;
  imageFileName = '';
  isSuccessMessage = false;
  isFailMessage = false;
  // urlImgServe = 'E:\\BaitapProjectCuoiKhoa\\C0319H2-Project-Backend\\src\\main\\resources\\imageUser\\';
  constructor(private token: TokenStorageService,
              private userService: UserServiceService,
              private fb: FormBuilder,
              private avtive: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.getUserNameByName();
    this.formUser = this.fb.group({
      birthdate: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^(0){1}\d{9,10}$/)]]
    });

  }


  getUserNameByName(): void {
    this.username = this.avtive.snapshot.paramMap.get('username');
    if (this.username !== null) {
      this.userService.getUserByName(this.username).subscribe(data => this.user = data);
    }
  }

  selectFile(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.imageFileName = event.target.files[0].name;
    }
  }


  onSubmit() {
    this.loading = true;
    if (this.file != null) {
      this.formData.append('username', this.user.username);
      this.formData.append('avatar', this.file);
      this.userService.updateAvatar(this.formData).subscribe(() => {
          this.getUserNameByName();
          this.loading = false;
          // this.messageImg = 'Uploaded successfully!';
        this.messageSuccess = 'Uploaded successfully!!';
        }, error1 => {
          this.messageFail = 'Failed to upload avatar!!. Cause: ' + error1.message;
        }
      );
    }
    this.loading = false;
    this.userService.editUser(this.user.username, this.formUser.value).subscribe(
      data => {
        this.isSuccessMessage = true;
        this.isFailMessage = false;
        this.messageSuccess = 'Uploaded successfully!!';
        this.loading = false;
      },
      error => {
        this.loading = true;
        this.isSuccessMessage = false;
        this.isFailMessage = true;
        this.messageFail = 'Failed to upload user!!';
        this.userService.handleError(error);
      }
    );
  }


  logout() {
    this.token.signOut();
    window.location.reload();
  }


}
