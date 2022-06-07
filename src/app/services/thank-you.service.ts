import {Injectable} from '@angular/core';
import {NearService} from "./near.service";

@Injectable({
  providedIn: 'root'
})
export class ThankYouService {
  public recipients: any;
  public messages: any;
  public err: any;

  constructor(public nearService: NearService) {
    this.updateValues();
  }

  async updateValues() {
    this.recipients = await this.nearService.getRecipients();
    await this.updateMessages();
  };

  async handleSendMessage({message, anonymous, attachedDeposit}: { message: any, anonymous: any, attachedDeposit: any }) {
    await this.nearService.sendMessage({message, anonymous, attachedDeposit});
  };

  async handleTransfer() {
    await this.nearService.transfer();
  }

  async updateMessages() {
    this.messages = await this.nearService.getMessages();
    this.messages.reverse();
  }
}
