import { ApiService } from './../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  assets: any = {};
  product: any;
  testy = [];
  mainform: FormGroup;
  filterform: FormGroup;

  sizes = false;
  types = false;
  prices = false;
  isDataAvailable = false;

  assetTypes: any;
  assetGroups: any;
  assetCategories: any;
  formLog: any;
  arr = [];

  constructor(private _fb: FormBuilder, private _api: ApiService, private _http: HttpClient,
    private _route: ActivatedRoute, private _router: Router) {

      this.mainform = this._fb.group({
        adlocation: '',
        adcate: ''
      });

      this._route.queryParams.subscribe(payload => {
        this.mainform.controls['adlocation'].setValue(payload._location);
        this.mainform.controls['adcate'].setValue(payload.category_id);
      });

      this.filterform = this._fb.group({
        adgroup: this._fb.group({
          grouptype: true
        }),
        adsize: this._fb.group({
          bigsize: '',
          smallsize: '',
          mediumsize: '',
        }),
        adtype: this._fb.group({
          type: true
        }),
        adprice: this._fb.group({
          pricestart: 2000,
          priceend: 3000000
        })
      });

      this.listAssets();
      this.listGroups();
      this.listCats();
      this.listTypes();
  }

  listAssets() {
    this.assets = this._api.getAssets().subscribe(result => {
      this.assets = result;
      this.assets = this.assets.data;
      console.log(this.assets.data);
    });
  }

  listTypes() {
    this._api.getAssetTypes().subscribe((payload: any) => {
      this.assetTypes = payload.data;
      console.log(this.assetTypes);
    });
    // this.isDataAvailable = true;
  }

  listCats() {
    this._api.getAssetCategories().subscribe((res: any) => {
      this.assetCategories = res.data;
    });
   }

  listGroups() {
    this._api.getAssetGroups().subscribe((result: any) => {
      this.assetGroups = result.data;
      console.log(this.assetGroups);
    });
  }

  changeLocation(val) {
    let txt = '';
    if (val.value.adcate === '1') {
      txt = '_location=' + val.value.adlocation + '&category_id=' + val.value.adcate;
      console.log(txt);
    }
  }

  filterResults(val) {
    // console.log(this.filterform.value);
    this.formLog = val.value.adgroup;
    this.testy = [Object.keys(this.formLog),
            Object.values(this.formLog),
            this.assetTypes
    ];
    console.log(this.testy);
    // console.log(Object.keys(this.formLog.adgroup));
    // console.log(Object.values(this.formLog.adgroup));
    // for (let i = 0; i < Object.keys(this.formLog.adgroup).length; i++) {
    //   console.log('Yay!');
    //   Object.keys(this.formLog.adgroup).forEach() {

    //   }
    // }
    // console.log(this.formLog.adgroup.type0.id);
    // if (this.formLog.adgroup) {
    //   for (let i = 0; i < Object.keys(this.formLog.adgroup).length; i++) {
    //     console.log('Yay!');
    //   }
    // }
  }

  checkBox(ev, val) {
    console.log(ev);
    if (ev.target.checked === true) {
      this.arr.push(val);
    } else {
      if (this.arr.length > 0) {
        const removeVal = this.arr.findIndex(x => x.id === val.id);
        // This is responsible for removing the element at position removeVal.
        // The elemnet and the element alone.
        this.arr.splice(removeVal, 1);
      }
    }
    console.log(this.arr);
    let text = '';
    for (let i = 0; i < this.arr.length; i++) {
      text += '&type_id=' + this.arr[i].id;
    }
    console.log(text);
  }

  showSizeOptions() {
    this.sizes = !this.sizes;
  }

  showTypeOptions() {
    this.types = !this.types;
  }

  showPriceOptions() {
    this.prices = !this.prices;
  }

  ngOnInit() {

    // this.filterform = this._fb.group({
    //   category: this._fb.group({ static: this._fb.array([true, false, true]), notstatic: this._fb.array([true, false, true]) }),
    //   size: this._fb.group({ big: this._fb.array([true, false, true]), small: this._fb.array([true, false, true]),
    //       medium: this._fb.array([true, false, true]) }),
    //   type: this._fb.group({ flagpole: this._fb.array([true, false, true]), mobilescreen: this._fb.array([true, false, true]),
    //       walldrape: this._fb.array([true, false, true]), gantry: this._fb.array([true, false, true]),
    //       ledcube: this._fb.array([true, false, true]), other: this._fb.array([true, false, true]) }),
    //   price: '100000', end: '500000000'
    // });
  }

  ngAfterViewInit() {
    // this.listAssets();
    // this.listGroups();
    // this.listCats();
    // this.listTypes();
  }

}
