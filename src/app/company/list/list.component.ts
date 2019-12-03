import {Component, OnInit} from '@angular/core';
import {CompanyserviceService} from '../companyservice.service';
import {Company} from '../company';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Technology} from '../../technology/technology';
import {Language} from '../Language';
import {Market} from '../Market';
import {Specialize} from '../Specialize';
import {Relationship} from '../Relationship';
import {TechnologyServiceService} from '../../technology/technology-service.service';
import {Tags} from '../../tags/Tags';
import {TagsService} from '../../tags/tags.service';
import {HttpEvent} from '@angular/common/http';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {



  listCompany: Company[];
  company: Company;
  message;
  info: any;
  id;
  roles: string[] = [];
  showAndHide: boolean;
  formCompany: FormGroup;
  companyName: string;
////////////////////////////// Form Them ////////////////////////////////
  // company duoc tra ve sau khi them
  newCompany: Company;
  // doi tuong them du kieu
  companyAdd: Company;
  messageAddSuccess;
  messageError;
  // hien thi du lieu
  tag: Tags[];
  technology: Technology[];
  language: Language[];
  market: Market[];
  specialize: Specialize[];
  relationship: Relationship[];
  // lai id
  ArrayTag: number[] = [];
  ArrayTechnology: number[] = [];
  ArrayLanguage: number[] = [];
  ArrayMarket: number[] = [];
  ArraySpecialize: number[] = [];
  newRelationship: Relationship;
  // ddng mang cac doi tuong checkbox
  newTag: Tags[];
  newTechnology: Technology[] = [];
  newLanguage: Language[] = [];
  newSpecialize: Specialize[] = [];
  newMarket: Market[] = [];
  file: any;
  ArrayFile: string[] = [];
  imgName: string[] = [];
  imageLogo = '';
  formData = new FormData();

  idDelete: number;

  //form Search
  searchRelationship: Relationship;
  companyName1: string;
  formDataSearch = new FormData();
  searchMessage;
   listCompa: Company[];

   formData1 = new FormData();

  formSearch: FormGroup;
  // p: any;
  // $even: any;

  ////////////////////////////// Form Them ////////////////////////////////
  constructor(private companyService: CompanyserviceService, private token: TokenStorageService,
              private route: Router,
              private fb: FormBuilder,
              private technologyService: TechnologyServiceService,
              private tagService: TagsService
  ) {
  }

  ngOnInit() {
    this.getRole();
    this.getAllCompany();
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.getAllTechnology();
    this.getAllLanguage();
    this.getAllMarket();
    this.getAllRelationship();
    this.getAllSpecialize();
    this.getAllTag();
    this.formCompany = this.fb.group({
      companyName: ['' ],
      shortname: ['' ],
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
      tag: ['']
    });


    this.formSearch = this.fb.group({
      companyName: [''],
      relationship: ['']
    })
  }


  getAllTechnology() {
    this.technologyService.getAllTechnology().subscribe(list => {
      this.technology = list;
    });
  }

  getAllTag() {
    this.tagService.getAllTags().subscribe(list => {
      this.tag = list;
    });
  }

  getAllLanguage() {
    this.companyService.getAllLanguage().subscribe(list => {
      this.language = list;
    });
  }

  getAllMarket() {
    this.companyService.getAllMarket().subscribe(list => {
      this.market = list;
    });
  }

  getAllSpecialize() {
    this.companyService.getAllSpecialize().subscribe(list => {
      this.specialize = list;
    });
  }

  getAllRelationship() {
    this.companyService.getAllRelationship().subscribe(list => {
      this.relationship = list;
    });
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


  onCheckboxSearchRelationship(rela){
    this.searchRelationship = rela;
  }
  onSearch(){

    // lay ten
   this.companyName1 = this.formSearch.get('companyName').value;
   // if ( this.companyName1 === '' && this.searchRelationship){
   //   this.getAllCompany();
   // }
   // if ( this.searchRelationship) {
   //
   // }
   if (this.companyName1 !== '' && !this.searchRelationship) {

     this.companyService.searchByName(this.companyName1).subscribe( list =>{
       this.listCompany = list;
     }, error => {
       this.companyService.handleError(error)
     })
   }else {
     this.companyService.searchByCompanyNameandRelationship(this.searchRelationship.id,this.companyName1).subscribe( list =>{
       this.listCompany = list;
       if (this.listCompany === null){
         this.searchMessage = 'Không tìm thấy company với tên này!!';
       }
     }, error => {
       this.searchMessage = 'Không tìm thấy company với tên này!!';
       this.companyService.handleError(error);
     })
   }


  }


  onCheckboxChangeRelationship(rela) {
    this.newRelationship = rela;
  }

  onCheckboxChangeLanguage(event, lang: Language) {
    if (event.target.checked) {
      this.ArrayLanguage.push(lang.id);
    } else {
      for (let i = 0; i < this.language.length; i++) {
        if (this.ArrayLanguage[i] === lang.id) {
          this.ArrayLanguage.splice(i, 1);
        }
      }
    }
    this.newLanguage = [];
    for (let j = 0; j < this.ArrayLanguage.length; j++) {
      if (this.ArrayLanguage[j] != null) {
        this.companyService.getLanguageById(this.ArrayLanguage[j]).subscribe(newLang => {
          this.newLanguage.push(newLang);
        });
      }
    }

  }

  onCheckboxChangeMarket(event, mar: Market) {
    if (event.target.checked) {
      this.ArrayMarket.push(mar.id);
    } else {
      for (let i = 0; i < this.market.length; i++) {
        if (this.ArrayMarket[i] === mar.id) {
          this.ArrayMarket.splice(i, 1);
        }
      }
    }
    this.newMarket = [];
    for (let j = 0; j < this.ArrayMarket.length; j++) {
      if (this.ArrayMarket[j] != null) {
        this.companyService.getMarketById(this.ArrayMarket[j]).subscribe(newMar => {
          this.newMarket.push(newMar);
        });
      }
    }
  }

  onCheckboxChange(event, tech: Technology) {
    // debugger;
    if (event.target.checked) {
      this.ArrayTechnology.push(tech.id);
    } else {
      for (let i = 0; i < this.technology.length; i++) {
        if (this.ArrayTechnology[i] === tech.id) {
          this.ArrayTechnology.splice(i, 1);
        }
      }
    }
    this.newTechnology = [];
    for (let j = 0; j < this.ArrayTechnology.length; j++) {
      if (this.ArrayTechnology[j] != null) {
        this.technologyService.getTechnologyById(this.ArrayTechnology[j]).subscribe(newTech => {
          this.newTechnology.push(newTech);
        });
      }
    }
  }

  onCheckboxChangeTag(event, t: Tags) {
    // debugger;
    if (event.target.checked) {
      this.ArrayTag.push(t.id);
    } else {
      for (let i = 0; i < this.tag.length; i++) {
        if (this.ArrayTag[i] === t.id) {
          this.ArrayTag.splice(i, 1);
        }
      }
    }
    this.newTag = [];
    for (let j = 0; j < this.ArrayTag.length; j++) {
      if (this.ArrayTag[j] != null) {
        this.tagService.getTagById(this.ArrayTag[j]).subscribe(newTech => {
          this.newTag.push(newTech);
        });
      }
    }
  }

  onCheckboxChangeSpecialize(event, spec: Specialize) {
    if (event.target.checked) {
      this.ArraySpecialize.push(spec.id);
    } else {
      for (let i = 0; i < this.technology.length; i++) {
        if (this.ArraySpecialize[i] === spec.id) {
          this.ArraySpecialize.splice(i, 1);
        }
      }
    }
    this.newSpecialize = [];
    for (let j = 0; j < this.ArraySpecialize.length; j++) {
      if (this.ArraySpecialize[j] != null) {
        this.companyService.getSpecializeById(this.ArraySpecialize[j]).subscribe(newSpec => {
          this.newSpecialize.push(newSpec);
        });
      }
    }
  }


  logout() {
    this.token.signOut();
    this.route.navigate(['/login']);
  }

// test chuc nang phan quyen trang quan ly
  getRole() {
    this.roles = this.token.getAuthorities();
    this.roles.every(role => {
      if (role === 'ROLE_ADMIN') {
        this.showAndHide = false;
      } else if (role === 'ROLE_USER') {
        this.showAndHide = true;
      }
    });
  }

  getAllCompany() {
    this.companyService.getAllCompany().subscribe(list => {
      this.listCompany = list;
    }, error => {
      this.companyService.handleError(error);
    });
  }

  changeActive() {

    if (this.idDelete != null) {
      this.companyService.changeActive(this.idDelete).subscribe(() => {
        this.getAllCompany();
        // alert('Da thay doi active thanh cong');
      }, error => {
        this.companyService.handleError(error);
      });
    }
  }


  getIdDelete(id: number) {

    this.idDelete = id;
  }


  onSubmit() {

    this.companyAdd = new Company(
      this.formCompany.get('companyName').value,
      this.formCompany.get('shortname').value,
      this.formCompany.get('address').value,
      this.formCompany.get('website').value,
      this.formCompany.get('phonenumber').value,
      this.formCompany.get('email').value,
      this.formCompany.get('introductoryinformation').value,
      this.newRelationship,
      this.newSpecialize,
      this.newLanguage,
      this.newTechnology,
      this.newMarket,
      this.formCompany.get('note').value,
      this.newTag
    );

    this.companyService.createCompany(this.companyAdd).subscribe(newComapny => {
      this.newCompany = newComapny;

      if (this.file != null) {
        this.formData.append('companylogo', this.file);
        this.companyService.addLogo(this.newCompany.id, this.formData).subscribe(() => {
          this.getAllCompany();
          // this.messageAddSuccess = 'Them anh thanh cong';
        }, error => {
          this.messageError = 'Them anh That bai';
        });
      }


// luu mang img
      if (this.ArrayFile != null) {

          for (var i = 0; i < this.ArrayFile.length; i++) {
            this.formData1.append('companyavatar', this.ArrayFile[i]);
          }

        // this.formData1.append('companyavatar', this.ArrayFile);
        this.companyService.addImg(this.newCompany.id, this.formData1).subscribe(() => {
          this.getAllCompany();
          // this.messageAddSuccess = 'Them anh thanh cong';
        }, error => {
          this.messageError = 'Them anh That bai';
        });
      }



      this.getAllCompany();
      this.messageAddSuccess = 'Thêm công ty thành công!!';

    }, error => {
      this.messageError = 'Them that bai!!';
      this.companyService.handleError(error);
    });
  }

  // search() {
  //   if (this.companyName !== '') {
  //     this.listCompany = this.listCompany.filter(res => {
  //       return res.companyName.toLocaleLowerCase().match(this.companyName.toLocaleLowerCase());
  //     });
  //   } else if (this.companyName === '') {
  //     this.getAllCompany();
  //   }
  // }
}
