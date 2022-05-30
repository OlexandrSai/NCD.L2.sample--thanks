import { Component, OnInit } from '@angular/core';
import { NearService } from "../../services/near.service";

@Component({
  selector: 'app-summarize',
  templateUrl: './summarize.component.html',
  styleUrls: ['./summarize.component.css']
})
export class SummarizeComponent implements OnInit {
  public isTransferringToOwner: boolean = false;
  public onTransfer: boolean = false;
  public summarizedInfo: any;

  constructor(public nearService: NearService) {

  }

  ngOnInit(): void {
    this.summarizedInfo = this.nearService.getSummarizedInfo();
    console.log(this.summarizedInfo);
  }

  handleTransfer = async () => {
    return this.nearService.transfer();
  }

}
