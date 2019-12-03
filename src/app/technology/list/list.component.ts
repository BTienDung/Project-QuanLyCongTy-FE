import {Component, OnInit} from '@angular/core';
import {Technology} from '../technology';
import {TechnologyServiceService} from '../technology-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  technology: Technology[];
  /////
  formadd: FormGroup;
  formEdit: FormGroup;
  technology1: Technology;
  messageSuccess = '';
  mesageError = '';
  loading = false;

  technologyEdit: Technology;

  info: any;

  messageEditTrue = true;
  messageEditFalse = true;
  messageEdit;

  messageDeleteTrue = true;
  messageDeleteFalse = true;
  messageDelete;
  techView: Technology;
  idDelete;
  constructor(private fb: FormBuilder, private technologyService: TechnologyServiceService, private token: TokenStorageService,
              private route: Router
              ) {
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.getAllTechnology();
    this.formadd = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.formEdit = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  getAllTechnology() {
    this.technologyService.getAllTechnology().subscribe(list => {
      this.technology = list;
    });
  }

  onSubmit() {
    this.loading = true;
    this.technology1 = new Technology(
      this.formadd.get('name').value
    );
    this.technologyService.addTechnology(this.technology1).subscribe(() => {
      this.messageSuccess = 'Thêm thành công~~~';
      this.loading = false;
      this.getAllTechnology();
    }, error1 => {
      this.mesageError = 'Thêm thất bại~~~';
      this.loading = true;
      this.technologyService.handleError(error1);
    });
  }

  logout() {
    this.token.signOut();
    this.route.navigate(['/login']);
  }

  editId(id: number) {
    debugger;
    this.technologyService.getTechnologyById(id).subscribe(data => {
      this.technologyEdit = data;
    });
  }
  deleteId(id: number){
    this.technologyService.deleteTechnology(id).subscribe( () => {
      this.messageDelete = 'Xóa thành công !!';
      this.messageDeleteTrue = false;
      this.messageDeleteFalse = true;
      this.getAllTechnology();
    }, error => {
      this.messageDelete = 'Xóa thất bại !!';
      this.messageDeleteTrue = true;
      this.messageDeleteFalse = false;
    });
  }
  onSubmitEdit() {
    debugger;
    this.technologyService.editTechnology(this.technologyEdit).subscribe(() => {
       this.messageEdit = 'Sửa Thành công';
       this.messageEditTrue = false;
       this.messageEditFalse = true;
       this.getAllTechnology();
    }, error => {
      this.messageEdit = 'Sửa thất bại';
      this.messageEditTrue = true;
      this.messageEditFalse = false;
    });
  }
  getIdDelete(id: number){
    this.idDelete = id;
  }

  viewTech(id: number){
    this.technologyService.getTechnologyById(id).subscribe( tech =>{
      this.techView = tech;
    })
  }



  deleteById() {

    if (this.idDelete != null) {
      this.technologyService.deleteTechnology(this.idDelete).subscribe(() => {
        this.getAllTechnology();

      }, error => {
        this.technologyService.handleError(error);
      });
    }
  }
}
