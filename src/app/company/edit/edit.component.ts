import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CompanyserviceService} from '../companyservice.service';
import {Company} from '../company';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Relationship} from '../Relationship';
import {Language} from '../Language';
import {Specialize} from '../Specialize';
import {Market} from '../Market';
import {Technology} from '../../technology/technology';
import {TechnologyServiceService} from '../../technology/technology-service.service';
import {Tags} from '../../tags/Tags';
import {TagsService} from '../../tags/tags.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  // luu company duoc tra ve sau khi them
  newCompany: Company;
  // luu company lay theo id
  company: Company;
  // khoi tao doi tuong de sua
  editCompany: Company;
  // luu doi tuong
  tags: Tags[];
  relationship: Relationship;
  specialize: Specialize[];
  language: Language[];
  market: Market[];
  technology: Technology[];
  // luu id doi tuong
  tagsId: number[] = [];
  languageId: number[] = [];
  specializeId: number[] = [];
  marketId: number[] = [];
  technologyId: number[] = [];

  formCompany: FormGroup;
  // hien thi du kieu
  Arraytags: Tags[];
  Arrayrelationship: Relationship[];
  Arraylanguage: Language[];
  Arrayspecialize: Specialize[];
  Arraymarket: Market[];
  Arraytechnology: Technology[];

  formData = new FormData();
  file: any;
  imageLogo = '';
  message = '';
  message1 = '';


  formData1 = new FormData();
  ArrayFile: string[] = [];
  showMessageTrue = true;
  showMessageFalse = true;
  constructor(private active: ActivatedRoute,
              private companyService: CompanyserviceService,
              private fb: FormBuilder,
              private technologyService: TechnologyServiceService,
              private tagServie: TagsService
  ) {
  }

  ngOnInit() {

    this.formCompany = this.fb.group({
      companyName: [''],
      shortname: [''],
      address: [''],
      website: [''],
      phonenumber: [''],
      email: [''],
      introductoryinformation: [''],
      relationship: [''],
      specialize: [''],
      language: [''],
      technology: [''],
      market: [''],
      note: [''],
      tags: ['']
    });
    this.getCompanyById();
    this.getAllRelationship();
    this.getAllLanguage();
    this.getAllSpecialize();
    this.getAllTechnology();
    this.getAllMarket();
    this.getAllTags();

  }

  getCompanyById(): void {
    const id = +this.active.snapshot.paramMap.get('id');
    this.companyService.getCompanyByid(id).subscribe(company => this.company = company);
  }

  getAllTags() {
    this.tagServie.getAllTags().subscribe(list => {
      this.Arraytags = list;
    });
  }

  getAllRelationship() {
    this.companyService.getAllRelationship().subscribe(list => {
      this.Arrayrelationship = list;
    });
  }

  getAllLanguage() {
    this.companyService.getAllLanguage().subscribe(list => {
      this.Arraylanguage = list;
    });
  }

  getAllSpecialize() {
    this.companyService.getAllSpecialize().subscribe(list => {
      this.Arrayspecialize = list;
    });
  }

  getAllTechnology() {
    this.technologyService.getAllTechnology().subscribe(list => {
      this.Arraytechnology = list;
    });
  }

  getAllMarket() {
    this.companyService.getAllMarket().subscribe(list => {
      this.Arraymarket = list;
    });
  }


  onCheckboxChangeRelationship(rela: Relationship) {
    this.relationship = rela;
  }


  onCheckboxChangeSpecialize(event, spec: Specialize) {
    this.specialize = this.company.specialize;
    if (event.target.checked) {
      if (this.travetruefalseSpec(spec) === false) {
        this.specialize.push(spec);
      }
    } else {
      for (let x = 0; x < this.specialize.length; x++) {
        if (spec.name === this.specialize[x].name) {
          this.specialize.splice(x, 1);
        }
      }
    }
  }


  onCheckboxChangeLanguage(event, lang: Language) {
    this.language = this.company.language;
    if (event.target.checked) {
      if (this.travetruefalseLang(lang) === false) {
        this.language.push(lang);
      }
    } else {
      for (let x = 0; x < this.language.length; x++) {
        if (lang.name === this.language[x].name) {
          this.language.splice(x, 1);
        }
      }
    }
  }


  onCheckboxChangeTechnology(event, tech: Technology) {
    this.technology = this.company.technology;
    if (event.target.checked) {
      if (this.travetruefalseTech(tech) === false) {
        this.technology.push(tech);
      }
    } else {
      for (let x = 0; x < this.technology.length; x++) {
        if (tech.name === this.technology[x].name) {
          this.technology.splice(x, 1);
        }
      }
    }
  }

  onCheckboxChangeMarket(event, mar: Market) {
    this.market = this.company.market;
    if (event.target.checked) {
      if (this.travetruefalseMar(mar) === false) {
        this.market.push(mar);
      }
    } else {
      for (let x = 0; x < this.market.length; x++) {
        if (mar.name === this.market[x].name) {
          this.market.splice(x, 1);
        }
      }
    }
  }

  onCheckboxChangeTag(event, t: Tags) {
    this.tags = this.company.tags;
    if (event.target.checked) {
      if (this.travetruefalseTag(t) === false) {
        this.tags.push(t);
      }
    } else {
      for (let x = 0; x < this.tags.length; x++) {
        if (t.name === this.tags[x].name) {
          this.tags.splice(x, 1);
        }
      }
    }
  }


  selectFile(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.imageLogo = event.target.files[0].name;
    }
  }

  selectArrayFile(event: any){
    for (var  i =0 ; i< event.target.files.length;i++ ){
      this.ArrayFile.push(event.target.files[i]);
    }
  }


  onSubmit() {
    if (this.language == null) {
      this.language = this.company.language;
    }
    if (this.relationship == null) {
      this.relationship = this.company.relationship;
    }
    if (this.market == null) {
      this.market = this.company.market;
    }
    if (this.specialize == null) {
      this.specialize = this.company.specialize;
    }

    if (this.technology == null) {
      this.technology = this.company.technology;
    }

    if (this.tags == null) {
      this.tags = this.company.tags;
    }
    this.editCompany = new Company(
      this.formCompany.get('companyName').value,
      this.formCompany.get('shortname').value,
      this.formCompany.get('address').value,
      this.formCompany.get('website').value,
      this.formCompany.get('phonenumber').value,
      this.formCompany.get('email').value,
      this.formCompany.get('introductoryinformation').value,
      this.relationship,
      this.specialize,
      this.language,
      this.technology,
      this.market,
      this.formCompany.get('note').value,
      this.tags
    );

    this.companyService.editCompany(this.company.id, this.editCompany).subscribe(newCompany => {

      this.newCompany = newCompany;
      if (this.file != null) {
        this.formData.append('companylogo', this.file);
        this.companyService.addLogo(this.newCompany.id, this.formData).subscribe(() => {
          // this.message1 = 'Sua anh thanh cong';
          this.getCompanyById();
        }, error => {
          // this.message1 = 'Sua anh that bai ';
        });
      }
      if (this.ArrayFile.length >0) {

        for (var i = 0; i < this.ArrayFile.length; i++) {
          this.formData1.append('companyavatar', this.ArrayFile[i]);
        }

        // this.formData1.append('companyavatar', this.ArrayFile);
        this.companyService.addImg(this.newCompany.id, this.formData1).subscribe(() => {
          this.getCompanyById();
          // this.messageAddSuccess = 'Them anh thanh cong';
        }, error => {
          // this.messageError = 'Them anh That bai';
        });
      }









      this.getCompanyById();
      this.showMessageTrue = false;
      this.showMessageFalse = true;
      this.message = 'Sua company thanh cong cong';
    }, error => {
      this.showMessageTrue = true;
      this.showMessageFalse = false;
      this.message1 = 'Sua company that bai ';
      this.companyService.handleError(error);
    });
  }

  // hàm so sánh đối tượng có tồn tại trong mảng
  travetruefalseLang(lang: Language): boolean {

    for (let i = 0; i < this.company.language.length; i++) {
      if (lang.name === this.company.language[i].name) {
        return true;
        break;
      }
    }
    return false;
  }


  travetruefalseSpec(spec: Specialize): boolean {
    for (let i = 0; i < this.company.specialize.length; i++) {
      if (spec.name === this.company.specialize[i].name) {
        return true;
        break;
      }
    }
    return false;
  }

  travetruefalseTech(tech: Technology): boolean {
    for (let i = 0; i < this.company.technology.length; i++) {
      if (tech.name === this.company.technology[i].name) {
        return true;
        break;
      }
    }
    return false;
  }


  travetruefalseMar(mar: Market): boolean {
    for (let i = 0; i < this.company.market.length; i++) {
      if (mar.name === this.company.market[i].name) {
        return true;
        break;
      }
    }
    return false;
  }


  travetruefalseTag(t: Tags): boolean {
    for (let i = 0; i < this.company.tags.length; i++) {
      if (t.name === this.company.tags[i].name) {
        return true;
        break;
      }
    }
    return false;
  }
  // hàm so sánh hiển thị checked
  sosanhLang(lang: Language): boolean {
    for (let i = 0; i < this.company.language.length; i++) {
      if (lang.name === this.company.language[i].name) {
        return true;
        break;
      }
    }
  }

  sosanhTech(tech: Technology): boolean {
    for (let i = 0; i < this.company.technology.length; i++) {
      if (tech.name === this.company.technology[i].name) {
        return true;
        break;
      }
    }
  }

  sosanhMar(mar: Market): boolean {
    for (let i = 0; i < this.company.market.length; i++) {
      if (mar.name === this.company.market[i].name) {
        return true;
        break;
      }
    }
  }

  sosanhSpec(spec: Specialize): boolean {
    for (let i = 0; i < this.company.specialize.length; i++) {
      if (spec.name === this.company.specialize[i].name) {
        return true;
        break;
      }
    }
  }

  sosanhRela(rela: Relationship): boolean {

    if (rela.name === this.company.relationship.name) {
      return true;
    } else {
      return false;
    }

  }


  sosanhTag(t: Tags): boolean {
    for (let i = 0; i < this.company.tags.length; i++) {
      if (t.name === this.company.tags[i].name) {
        return true;
        break;
      }
    }
  }
}
