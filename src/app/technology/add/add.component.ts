import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TechnologyServiceService} from '../technology-service.service';
import {Technology} from '../technology';
import {error} from 'util';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formadd: FormGroup;
  technology: Technology;
  message = '';
loading = false;
  constructor(private fb: FormBuilder, private technologyService: TechnologyServiceService) {
  }

  ngOnInit() {
    this.formadd = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    this.loading = true;
    this.technology = new Technology(
      this.formadd.get('name').value
    );
    this.technologyService.addTechnology(this.technology).subscribe(() => {
      this.message = 'Thêm thành công~~~';
      this.loading = false;
    }, error1 => {
      this.message = 'Thêm thất bại~~~';
      this.loading = true;
      this.technologyService.handleError(error1);
    });
  }
}
