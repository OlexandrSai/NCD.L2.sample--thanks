import { Component, OnInit } from '@angular/core';
import { utils } from 'near-api-js';
import { ThankYouService } from "../../services/thank-you.service";

@Component({
  selector: 'app-summarize',
  templateUrl: './summarize.component.html',
  styleUrls: ['./summarize.component.css']
})
export class SummarizeComponent implements OnInit {
  public isTransferringToOwner: boolean = false;
  public isLoading: boolean = false;
  public isOwner: boolean = false;
  public onTransfer: boolean = false;
  public summarizedInfo: any;

  constructor(public thankYouService: ThankYouService) {
  }

  async ngOnInit() {
    await this.check();
  }

  async check() {
    this.thankYouService.isLoading = true;
    this.isOwner = this.thankYouService.nearService.wallet.getAccountId() === await this.thankYouService.nearService.getOwner();

    if (this.isOwner) {
      this.summarizedInfo = await this.thankYouService.nearService.getSummarizedInfo();
    }

    this.thankYouService.isLoading = false;
  }

  formatData(data: any) {
    return data.length > 10
      ? utils.format.formatNearAmount(data)
      : data.toString().match('e')
        ? data.toString().slice(0, 4)
        : data;
  }

  async handleTransfer() {
    return this.thankYouService.nearService.transfer();
  }

}
