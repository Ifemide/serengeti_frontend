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
      // console.log(params.get('id'));
      this.id = params.get('id');
      // get('id');
      console.log(params);
    });

    this.asset = this._api.getSingleAsset(this.id)
      .subscribe((result: any) => {
      this.asset = result.data;
      // console.log(this.asset);
      // this.asset = this.asset.data;
    });

  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }



}
