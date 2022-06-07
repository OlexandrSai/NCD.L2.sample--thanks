import {Component} from '@angular/core';
import {ThankYouService} from "../../../services/thank-you.service";

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {
  public loading = false;
  public anonymous = false;
  public attachedDeposit = 0;
  public message = '';
  public recipient:any = null;

  constructor(public thankYouService: ThankYouService) {
  }

  async handleSubmit() {
    this.loading = true;

    await this.thankYouService.handleSendMessage({
      message: this.message,
      anonymous: this.anonymous,
      attachedDeposit: this.attachedDeposit
    });
    await this.thankYouService.updateMessages();
    this.loading = false;
  }

  async handleTransfer() {
    this.loading = true;

    await this.thankYouService.handleTransfer();

    this.loading = false;
  }

  async recipientChange(recipient: any) {
    this.recipient = recipient.value;
  }
}
