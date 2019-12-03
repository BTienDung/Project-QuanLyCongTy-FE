import { Component, OnInit } from '@angular/core';
import {CompanyserviceService} from '../../company/companyservice.service';
import {Company} from '../../company/company';

@Component({
  selector: 'app-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.css']
})
export class BossComponent implements OnInit {
  company: Company[];
  constructor(private companyService: CompanyserviceService) { }

  ngOnInit() {
    this.getAllCompany();
  }
 getAllCompany(){
    this.companyService.getAllCompany().subscribe( list =>{
      this.company = list;
    })
 }
}
