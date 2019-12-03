import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';
import {TagsService} from '../tags.service';

import {Tags} from '../Tags';
import {Technology} from '../../technology/technology';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tags: Tags[];
  /////
  formadd: FormGroup;
  formEdit: FormGroup;
  tag: Tags;
  messageSuccess = '';
  mesageError = '';
  loading = false;

  tagEditId: Tags;
  tagView: Tags;
  info: any;

  messageEditTrue = true;
  messageEditFalse = true;
  messageEdit;
   iddelete;
  messageDeleteTrue = true;
  messageDeleteFalse = true;
  messageDelete;
  constructor(private fb: FormBuilder, private tagService: TagsService, private token: TokenStorageService,
              private route: Router) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.getAllTag();
    this.formadd = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.formEdit = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  getAllTag() {
    this.tagService.getAllTags().subscribe(list => {
      this.tags = list;
    });
  }

  onSubmit() {
    this.loading = true;
    this.tag = new Technology(
      this.formadd.get('name').value
    );
    this.tagService.addTags(this.tag).subscribe(() => {
      this.messageSuccess = 'Thêm thành công~~~';
      this.loading = false;
      this.getAllTag();
    }, error1 => {
      this.mesageError = 'Thêm thất bại~~~';
      this.loading = true;
      this.tagService.handleError(error1);
    });
  }

  deleteId(id: number){
    this.tagService.deleteTag(id).subscribe( () => {
      this.messageDelete = 'Xóa thành công !!';
      this.messageDeleteTrue = false;
      this.messageDeleteFalse = true;
      this.getAllTag();
    }, error => {
      this.messageDelete = 'Xóa thất bại !!';
      this.messageDeleteTrue = true;
      this.messageDeleteFalse = false;
    });
  }


  editId(id: number) {
   this.tagService.getTagById(id).subscribe( data => {
     this.tagEditId = data;
   })
  }
  logout() {
    this.token.signOut();
    this.route.navigate(['/login']);
  }
  editTag(){

    this.tagService.editTags(this.tagEditId).subscribe(() => {
      this.messageEdit = 'Sửa Thành công';
      this.messageEditTrue = false;
      this.messageEditFalse = true;
      this.getAllTag();
    }, error => {
      this.messageEdit = 'Sửa thất bại';
      this.messageEditTrue = true;
      this.messageEditFalse = false;
    });
  }
  viewTech(id: number){
    this.tagService.getTagById(id).subscribe( tag =>{
      this.tagView = tag;
    })
  }



  getIdDelete(id: number){
    debugger;
    this.iddelete = id;
  }
  deleteById(){
    debugger;
    if (this.iddelete != null) {
      this.tagService.deleteTag(this.iddelete).subscribe(() => {
        this.getAllTag();

      }, error => {
        this.tagService.handleError(error);
      });
    }
  }
}
