import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-provider',
  templateUrl: './view-provider.component.html',
  styleUrls: ['./view-provider.component.scss'],
})
export class ViewProviderComponent implements OnInit {
  @Input() providerId: string;

  provider: string;

  constructor() {}

  ngOnInit() {
    this.provider = this.providerId;
  }
}
