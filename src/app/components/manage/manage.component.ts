import { ApiService } from './../../api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  id: any;
  asset: any;
  public drawer = true;
  public mediaBuyerForm = false;

  constructor(private _api: ApiService, private _route: ActivatedRoute) {
    window.scrollTo(0, 0);
   }

  ngOnInit() {

    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this._api.getSingleAsset(this.id).subscribe(data => {
      this.asset = data;
      this.asset = this.asset.data;
      this.showMediaBuyerForm();
      this.drawer = false;
    });

  }

  showMediaBuyerForm() {
    this.mediaBuyerForm = !this.mediaBuyerForm;
  }

}
