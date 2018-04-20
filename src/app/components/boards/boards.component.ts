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
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  private filterBasedOnSearchParams(){
    this._location = this.getParameterByName('_location', location.href);
    this._filter_prop._asset_category_id = this.getParameterByName('category_id', location.href);
    // this.defSearch(this._location, this._filter_prop._asset_category_id);
    console.log("I am doing this")
  }
  private getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  assets: any = {};
  assetTypes: any = {};
  assetFaces: any = {};
  assetsCategories: any = {};
  boardSizes: any = {};
  product: any;
  mainform: FormGroup;
  filterform: FormGroup;
  _location: any;
  _filter_prop: any = {
      _asset_type_id: [],
      _asset_category_id: '',
      _price: {
        from: '',
        to: ''
      },
      _size:[],
      _face_id: [],
      _asset_type_group_id: []
    };

  sizes = false;
  types = false;
  prices = false;
  assetsTypeGroup: any = {};
  public mediaBuyerForm = false;

  
  constructor(private _fb: FormBuilder, private _api: ApiService, private _http: HttpClient) {

    this.assets = this._api.getData().subscribe(result => this.assets = result);

    this.assetTypes = this._api.getAssetTypes().subscribe(data => this.assetTypes = data);
    
    this.assetFaces = this._api.getAssetFaces().subscribe(data => this.assetFaces = data);

    this.assetsCategories = this._api.getAssetCategories().subscribe(data => this.assetsCategories = data);
    
    this.assetsTypeGroup = this._api.getAssetTypeGroups().subscribe(data => this.assetsTypeGroup = data);

    this.boardSizes = this._api.getBoardSizes().subscribe(data => this.boardSizes = data);
    
   }

  goSearch(g: FormGroup) {
    this._filter_prop._asset_category_id = g.get('adcate').value;
    this._location = g.get('adlocation').value;
    console.log(this._location);
    console.log(this._filter_prop)
    this._api.doFilter(`assets?_location=${this._location}&query=${this._filter_prop._size}&category_id=${this._filter_prop._asset_category_id}&type_id=${this._filter_prop._asset_type_id}&face_id=${this._filter_prop._face_id}&group_id=${this._filter_prop._asset_type_group_id}`).subscribe(result => this.assets = result)
  }

  defSearch(loc, cat) {
    this._api.doFilter(`assets?_location=${loc}&category_id=${cat}`).subscribe(result => this.assets = result)
  }


  saveAssetTypeFilter(type_id){
    if (this._filter_prop._asset_type_id.indexOf(type_id) === -1 ) {
      this._filter_prop._asset_type_id.push(type_id) 
    } else {
      var index = this._filter_prop._asset_type_id.indexOf(type_id);
      if(index!=-1){
        this._filter_prop._asset_type_id.splice(index, 1);
      }
    } 

  }

  saveAssetTypeGroupFilter(type_id){
    if (this._filter_prop._asset_type_group_id.indexOf(type_id) === -1 ) {
      this._filter_prop._asset_type_group_id.push(type_id) 
    } else {
      var index = this._filter_prop._asset_type_group_id.indexOf(type_id);
      if(index!=-1){
        this._filter_prop._asset_type_group_id.splice(index, 1);
      }
    } 

  }
  saveAssetFromPriceFilter(g: FormGroup){
    this._filter_prop._price.from = g.get('adlocation').value;
  }

  saveAssetFaceFilter(id){
    if (this._filter_prop._face_id.indexOf(id) === -1 ) {
      this._filter_prop._face_id.push(id) 
    } else {
      var index = this._filter_prop._face_id.indexOf(id);
      if(index!=-1){
        this._filter_prop._face_id.splice(index, 1);
      }
    } 
  }
  // saveAssetToPriceFilter(g: FormGroup){
  //   this.get('_filter_prop').get('_price').set('to', v);
  // }

  saveAssetSizeFilter(size){
    if (this._filter_prop._size.indexOf(size) === -1 ) {
      this._filter_prop._size.push(size) 
    } else {
      var index = this._filter_prop._size.indexOf(size);
      if(index!=-1){
        this._filter_prop._size.splice(index, 1);
      }
    } 
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
    this.filterBasedOnSearchParams();
    console.log(this._location);

    this.mainform = this._fb.group({
      adlocation: this._location,
      adcate: this._filter_prop._asset_category_id
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
