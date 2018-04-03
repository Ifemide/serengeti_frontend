import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  public block1 = true;
  public block2 = false;
  public block3 = false;
  public block4 = false;

  constructor() { }

  ngOnInit() {
  }

  showBlock1() {
    this.block1 = true;
    this.block2 = false;
    this.block3 = false;
    this.block4 = false;
    window.scrollTo(0, 0);
  }

  showBlock2() {
    this.block1 = false;
    this.block2 = true;
    this.block3 = false;
    this.block4 = false;
    window.scrollTo(0, 0);
  }

  showBlock3() {
    this.block1 = false;
    this.block2 = false;
    this.block3 = true;
    this.block4 = false;
    window.scrollTo(0, 0);
  }

  showBlock4() {
    this.block1 = false;
    this.block2 = false;
    this.block3 = false;
    this.block4 = true;
    window.scrollTo(0, 0);
  }

}
