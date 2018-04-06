import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: any;
  asset: {};

  constructor(private _route: ActivatedRoute, private _api: ApiService) {

    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.asset = this._api.getSingleAsset(this.id)
      .subscribe(result => {
      this.asset = result;
      // this.asset = this.asset.data;
    });

  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }



}
