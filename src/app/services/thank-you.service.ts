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

  updateValues = async () => {
    this.recipients = await this.nearService.getRecipients();
    await this.updateMessages();
  };

  handleSendMessage = async ({message, anonymous, attachedDeposit}: { message: any, anonymous: any, attachedDeposit: any }) => {
    await this.nearService.sendMessage({message, anonymous, attachedDeposit});
  };

  handleTransfer = async () => {
    await this.nearService.transfer();
  }

  updateMessages = async () => {
    this.messages = await this.nearService.getMessages();
    this.messages.reverse();
  }
}
