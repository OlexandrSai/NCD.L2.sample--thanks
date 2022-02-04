import { Component, OnInit } from '@angular/core';
import {ThankYouService} from "../../services/thank-you.service";

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css']
})
export class MessageHistoryComponent implements OnInit {
  constructor(public thankYouService: ThankYouService) { }

  ngOnInit(): void {
  }

}
