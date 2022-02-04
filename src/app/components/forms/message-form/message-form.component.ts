import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThankYouService} from "../../../services/thank-you.service";

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  @Output() newMessageEvent = new EventEmitter<any>();
  public loading = false;
  public anonymous = false;
  public attachedDeposit = 0;
  public message = '';
  public recipient:any = null;

  constructor(public thankYouService: ThankYouService) {
  }

  ngOnInit(): void {
  }

  handleSubmit = async () => {
    this.loading = true;

    await this.thankYouService.handleSendMessage({
      message: this.message,
      anonymous: this.anonymous,
      attachedDeposit: this.attachedDeposit
    });
    this.newMessageEvent.emit(true);
    this.loading = false;
  }

  handleTransfer = async () => {
    this.loading = true;

    await this.thankYouService.handleTransfer();

    this.loading = false;
  }

  recipientChange = (recipient: any) => {
    this.recipient = recipient.value;
  }
}
