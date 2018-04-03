import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  public mediaBuyerForm = false;

  constructor() { }

  ngOnInit() {
  }

  showMediaBuyerForm() {
    this.mediaBuyerForm = !this.mediaBuyerForm;
  }

}
