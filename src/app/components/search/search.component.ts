import { ApiService } from './../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  assets: any = {};
  product: any;
  mainform: FormGroup;
  filterform: FormGroup;

  sizes = false;
  types = false;
  prices = false;

  constructor(private _fb: FormBuilder, private _api: ApiService, private _http: HttpClient) {

    this.assets = this._api.getData().subscribe(result => {
      this.assets = result;
      this.assets = this.assets.data;
      console.log(this.assets);
    });

   }

  goSearch(val) {
    // if (this.mainform.valid) {
    //   console.log('Form Submitted!');
    // } else { console.log(20); }
  }

  doFilter(val) {
    // console.log(val);
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
    this.mainform = this._fb.group({
      adlocation: '',
      adcate: ''
    });

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

}
