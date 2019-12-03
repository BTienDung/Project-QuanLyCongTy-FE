import {Component, OnInit} from '@angular/core';
import {Company} from '../company';
import {CompanyserviceService} from '../companyservice.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  company: Company;

  constructor(private conmapnyService: CompanyserviceService,
              private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getCompanyByid();
  }

  getCompanyByid() {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.conmapnyService.getCompanyByid(id).subscribe(data => {
      this.company = data;
    });
  }
}
