import { Component, OnInit } from '@angular/core';
import {ThankYouService} from "../../services/thank-you.service";

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css']
})
export class MessageHistoryComponent implements OnInit {
  public items = [
    {
      id: 1,
      sender: 'jane.near',
      text: 'Thanks for helping me with my first smart contract!',
      contribution: 1000000000000000000000000
    },
    {
      id: 2,
      sender: 'john.near',
      text: 'Appreciate your questions in the Zoom meeting',
      contribution: 0
    },
    {
      id: 3,
      sender: 'mary.near',
      text: 'Loved your examples today, thank you!!!',
      contribution: 10000000000000000000000000
    },
    {
      id: 4,
      sender: '',
      text: 'You\'re so awesome',
      contribution: 0
    }
  ]
  constructor(public thankYouService: ThankYouService) { }

  ngOnInit(): void {
    this.updateMessages();
  }

  updateMessages = async () => {
    this.items = await this.thankYouService.getMessages();
  }

}
