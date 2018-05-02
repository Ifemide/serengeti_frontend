import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { removeSummaryDuplicates } from '@angular/compiler';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  public block1 = true;
  public block2 = false;
  public block3 = false;
  public block4 = false;
  public block5 = false;

  loginReq: any = true;
  showReg: any = false;
  authErrors: any;

  user: any = {
    email: null,
    name: null,
    password: null,
    phone: null
  };

  public campaign: any = {
    company_name: null,
    contact_person_name: null,
    contact_person_phone: null,
    contact_person_emai: null,
    campaign_budget: null,
    campaign_duration: null,
    brand: null,
    start_date: null,
    campaign_name: null,
    end_date: null,
    gender: [],
    age_group: [],
    interests: [],
    selected_locations: null,
    // location_name: null,
    // location_lat: null,
    // location_lng: null,
    // location_radius: null,
    gross_budget_digital: null,
    gross_budget_sms: null,
    creative_ad_format: [],
    destination_link: null,
    additional_note: null,
    campaign_measurement: null,
    is_draft: null,
    campain_file_1: null,
    campain_file_2: null,
    campain_file_3: null,
    campain_file_4: null,
    campain_file_5: null,
    campain_file_6: null,
    campain_file_7: null,
    campain_file_8: null,
    campain_file_9: null,
    campain_file_10: null
  }

  public campaign_interests: any = [
    'Entertainment',
    'Sports',
    'Banking',
    'Education',
    'Health'
  ]
  campaign_locations: any;
  selected_campaign_locations: any = [];

  constructor(private _route: ActivatedRoute, private _api: ApiService,
    private _fb: FormBuilder, private _http: HttpClient) {
      this.campaign_locations = this._api.getCampaignLocations()
        .subscribe( (result: any) => {
        this.campaign_locations = result.data;
      });

     }

  showBlock1() {
    this.block1 = true;
    this.block2 = false;
    this.block3 = false;
    this.block4 = false;
    this.block5 = false;
    window.scrollTo(0, 0);
  }

  showBlock2() {
    this.block1 = false;
    this.block2 = true;
    this.block3 = false;
    this.block4 = false;
    this.block5 = false;
    window.scrollTo(0, 0);
  }

  showBlock3() {
    this.block1 = false;
    this.block2 = false;
    this.block3 = true;
    this.block4 = false;
    this.block5 = false;
    window.scrollTo(0, 0);
  }

  showBlock4() {
    this.block1 = false;
    this.block2 = false;
    this.block3 = false;
    this.block4 = true;
    this.block5 = false;
    window.scrollTo(0, 0);
  }

  showBlock5() {
    this.block1 = false;
    this.block2 = false;
    this.block3 = false;
    this.block4 = false;
    this.block5 = true;
    window.scrollTo(0, 0);
  }

  submitCampaign(){
    console.log(this.campaign);
  }

  mapSelectedCampaignLocationIntoArrOfObject(){
    this.campaign.selected_locations = this.campaign_locations.filter(l => this.selected_campaign_locations.includes(l.id));
    console.log(this.campaign.selected_locations );
  }
  updateCampaignProperty(value, prop){
    var exist = this.campaign[prop].includes(value);
    if(exist){
      // do remove
      this.campaign[prop].splice(value, 1);
    }else{
      this.campaign[prop].push(value);
    }
  }
  preloadBooking() {
    const usr_obj = JSON.parse(localStorage.getItem('PLU:userInfo')).data;
    this.campaign.contact_person_name = usr_obj.attributes.name;
    this.campaign.contact_person_phone = usr_obj.attributes.phonenumber;
    this.campaign.contact_person_email = usr_obj.attributes.email;
  }

  decideAuth() {
    if (localStorage.getItem('PLU:isUserAuthenticated') === 'true' ) {
      this.loginReq = false;
      this.preloadBooking();
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    // this.makeRequestForm = this._fb.group({
    // });
    this.decideAuth();
  }
  showRegister() {
    this.showReg = !this.showReg;
  }

  authenticateUser() {
    if (this.showReg) {
      console.log('doing reg');
      this._api.registerUser(this.user).subscribe(result => {
        if (result.status === 401 || result.status === 403) {
            this.authErrors = result['errors'];
        } else {
          localStorage.setItem('PLU:isUserAuthenticated', 'true');
          localStorage.setItem('PLU:userInfo', JSON.stringify(result.body));
          localStorage.setItem('PLU:authHeaders', JSON.stringify({
            'access-token' : result.headers.get('access-token'),
            'client' : result.headers.get('client'),
            'uid' : result.headers.get('uid'),
            'expiry' : result.headers.get('expiry')
          }));
          this.decideAuth();
        }
      });

    } else {
      // do login
      this._api.loginUser(this.user).subscribe(result => {
        if (result.status === 401 || result.status === 403) {
            this.authErrors = result['errors'];
        } else {
          localStorage.setItem('PLU:isUserAuthenticated', 'true');
          localStorage.setItem('PLU:userInfo', JSON.stringify(result.body));
          localStorage.setItem('PLU:authHeaders', JSON.stringify({
            'access-token' : result.headers.get('access-token'),
            'client' : result.headers.get('client'),
            'uid' : result.headers.get('uid'),
            'expiry' : result.headers.get('expiry')
          }));
          this.decideAuth();
        }
      });
    }
  }

}
