import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css']
})
export class MessageHistoryComponent implements OnInit {
  public items = [
    {
      id: 1,
      author: 'jane.near',
      message: 'Thanks for helping me with my first smart contract!',
      tip: '2 N'
    },
    {
      id: 2,
      author: 'john.near',
      message: 'Appreciate your questions in the Zoom meeting',
      tip: ''
    },
    {
      id: 3,
      author: 'mary.near',
      message: 'Loved your examples today, thank you!!!',
      tip: '10 N'
    },
    {
      id: 4,
      author: '',
      message: 'You\'re so awesome',
      tip: ''
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
