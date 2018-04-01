import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  public block1 = false;
  public block2 = false;
  public block3 = true;

  constructor() { }

  ngOnInit() {
  }

}
