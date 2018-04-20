import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
// import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  url: any;
  _location: any;
  category_id: any;
  assets: any;
  temp: any;

  constructor(private _http: HttpClient) {

    // this.url = 'http://localhost:3000/api/';
    this.url = 'http://api-v1.prideland.ng/api/';

  }

  getSingleAsset(id) {
    return this._http.get(this.url + 'assets/' + id);
    // return this._http.get('assets/asset.json');
  }

  doFilter(f_url) {
    return this._http.get(this.url + f_url);
  }

  getData() {
    return this._http.get(this.url + 'assets');
  }

  getAssetGroups() {
    return this._http.get(this.url + 'asset_type_groups');
  }

  getAssetTypes() {
    return this._http.get(this.url + 'asset_types');
  }

  getAssetFaces() {
    return this._http.get(this.url + 'asset_faces');
  }

  getAssetCategories() {
    return this._http.get(this.url + 'asset_categories');
  }

  getBoardSizes() {
    return this._http.get(this.url + 'data/board_sizes');
  }

  getAssetTypeGroups() {
    return this._http.get(this.url + 'asset_type_groups');
  }

  loginUser(form) {
    return this._http.post(this.url + 'auth/sign_in', form, {observe: 'response'});
  }

  registerUser(form) {
    return this._http.post(this.url + 'auth', form, {observe: 'response'});
  }

  makeBookingRequest(form) {
    return this._http.post(this.url + 'bookings', form, { observe: 'response',
    headers: JSON.parse(localStorage.getItem('PLU:authHeaders'))});
  }

}
