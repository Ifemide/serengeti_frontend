import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: any;
  asset: any;
  public mediaBuyerForm = false;
  makeRequestForm: FormGroup;
  loginReq: any = true;
  showReg: any = false;
  authErrors: any;
  // user_email: any = null;
  // user_password: any = null;
  // user_name: any = null;
  // user_phone: any = null;
  user: any = {
    email: null,
    name: null,
    password: null,
    phone: null
  };

  booking: any = {
    contact_person_name: null,
    contact_person_phone: null,
    contact_person_email: null,
    campaign_budget: null,
    campaign_duration: null,
    asset_id: this.id
  };

  constructor(private _route: ActivatedRoute, private _api: ApiService, private _fb: FormBuilder, private _http: HttpClient) {

    this._route.paramMap.subscribe(params => {
      // console.log(params.get('id'));
      this.id = params.get('id');
      // get('id');
      // console.log(params);
    });

    this.asset = this._api.getSingleAsset(this.id)
      .subscribe( (result: any) => {
        console.log(result);
      this.asset = result.data.attributes;
    });

  }

  showMediaBuyerForm() {
    this.mediaBuyerForm = !this.mediaBuyerForm;
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
          localStorage.setItem('PLU:userInfo', JSON.stringify(result.body['data']));
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

  preloadBooking() {
    const usr_obj = JSON.parse(localStorage.getItem('PLU:userInfo')).data;
    this.booking.contact_person_name = usr_obj.attributes.name;
    this.booking.contact_person_phone = usr_obj.attributes.phonenumber;
    this.booking.contact_person_email = usr_obj.attributes.email;
  }
  makeBooking() {
    this.booking.asset_id = this.id;
    this._api.makeBookingRequest({booking: this.booking}).subscribe(result => {
       alert('Your request has been submitted, you will recieve a call from a media planner few minutes');
       this.closeBookingDialog();
      }
    );
  }

  closeBookingDialog() {
    this.mediaBuyerForm = false;
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



}
