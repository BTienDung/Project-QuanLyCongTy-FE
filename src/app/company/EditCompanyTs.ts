import {Relationship} from './Relationship';
import {Specialize} from './Specialize';
import {Language} from './Language';
import {Technology} from '../technology/technology';
import {Market} from './Market';

export class EditCompanyTs {
  id: number;


  companyName: string;


  shortname: string;


  address: string;


  website: string;


  phonenumber: number;


  email: string;


  introductoryinformation: string;

  companylogo: string | any;


  companyavatar: string | any;


  relationship: Relationship;


  specialize: Specialize[];


  language: Language[];


  technology: Technology[];


  market: Market[];


  note: string;

  active: boolean;


  constructor1(id: number, companyName: string, shortname: string, address: string, website: string, phonenumber: number, email: string, introductoryinformation: string, relationship: Relationship, specialize: Specialize[], language: Language[], technology: Technology[], market: Market[], note: string) {
    this.id = id;
    this.companyName = companyName;
    this.shortname = shortname;
    this.address = address;
    this.website = website;
    this.phonenumber = phonenumber;
    this.email = email;
    this.introductoryinformation = introductoryinformation;
    this.relationship = relationship;
    this.specialize = specialize;
    this.language = language;
    this.technology = technology;
    this.market = market;
    this.note = note;
    this.active = true;
  }
}
