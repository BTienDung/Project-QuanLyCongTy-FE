import {Technology} from '../technology/technology';
import {Relationship} from './Relationship';
import {Specialize} from './Specialize';
import {Language} from './Language';
import {Market} from './Market';
import {Tags} from '../tags/Tags';

export class Company {
  id: number;


  companyName: string;


  shortname: string;


  address: string;


  website: string;


  phonenumber: number;


  email: string;


  introductoryinformation: string;

  companylogo: string | any;


  companyavatar: string[] | any;


  relationship: Relationship;


  specialize: Specialize[];


  language: Language[];


  technology: Technology[];


  market: Market[];


  note: string;

  active: boolean;


  tags: Tags[];

  constructor(companyName: string, shortname: string, address: string, website: string, phonenumber: number, email: string, introductoryinformation: string, relationship: Relationship, specialize: Specialize[], language: Language[], technology: Technology[], market: Market[], note: string,tags: Tags[]) {
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
    this.tags = tags;
  }




}
