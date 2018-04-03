import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myform: FormGroup;
  area: any;
  adtype: any;


  constructor(private _formBuilder: FormBuilder) {
    this.myform = this._formBuilder.group({
      'area': '',
      'adtype': ''
    });
  }

  ngOnInit() {}

  queryDB(val) {
    this.myform = val;
    location.href = location.href + 'search?_location=' + this.myform.value.area + '&category_id=' + this.myform.value.adtype;
  }

}
