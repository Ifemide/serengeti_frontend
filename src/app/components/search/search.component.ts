import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public showSizes = false;
  public showTypes = false;
  public showPrices = false;

  constructor() { }

  ngOnInit() {
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

}
