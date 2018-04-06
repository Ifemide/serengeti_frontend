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

  constructor(private _route: ActivatedRoute, private _api: ApiService) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this._api.getSingleAsset(this.id).subscribe(data => {
      this.asset = data;
      this.asset = this.asset.data;
    });
  }



}
