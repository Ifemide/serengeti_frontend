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

    this.url = 'http://api-v1.prideland.ng/api/';

  }

  getSingleAsset(id) {
    return this._http.get(this.url + 'assets/' + id);
    // return this._http.get('assets/asset.json');
  }

  getAssets() {
    // return this._http.get('assets/assets.json');
    return this._http.get(this.url + 'assets');
  }

  getAssetTypes() {
    return this._http.get(this.url + 'asset_types');
  }

  getAssetGroups() {
    return this._http.get(this.url + 'asset_type_groups');
  }

  getAssetCategories() {
    return this._http.get(this.url + 'asset_categories');
  }

  // getAssets(link) {
  //   const i = link.indexOf('?');
  //   link = link.substring(i);
  //   console.log(this.url + 'assets' + link);

  //   return this._http.get(this.url + 'assets' + link)
  //     .subscribe(resp => {
  //         console.log(resp);
  //     });
  // }

  // Some Endpoints
  // this.url + 'asset_type_groups'
  // this.url + 'asset_types'
  // this.url + 'asset_categories'
  // this.url + 'asset_sizes'

}
