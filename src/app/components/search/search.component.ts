import { ApiService } from './../../api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

  page: any; result: any; userId: any; params: any; query: any; mainForm: any; assets: any ;

  public showSizes = false; public showTypes = false; public showPrices = false;

  constructor(private _formBuilder: FormBuilder, private _api: ApiService, private _http: HttpClient) {
    this._api.getAssets(location.href);
    // this.getJSON().subscribe(data => {
    this._http.get('assets/assets.json').subscribe(data => {
     this.assets = data;
    });

    // console.log(this.assets);

      this.mainForm = this._formBuilder.group({
        'area': '',
        'adtype': ''
      });
   }


  goSearch(val) {
    this.mainForm = val;
    console.log(this.mainForm.value);
  }

  showSizeOptions() {
    this.showSizes = !this.showSizes;
  }

  showTypeOptions() {
    this.showTypes = !this.showTypes;
  }

  showPriceOptions() {
    this.showPrices = !this.showPrices;
  }

  ngOnInit() {

  }

  // public getJSON(): Observable<any> {
  //   return this._http.get('assets/assets.json').map((res: any) => res.json());
  // }

}
