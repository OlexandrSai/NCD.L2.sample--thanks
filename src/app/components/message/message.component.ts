import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: any = {};

  constructor() {
  }

  ngOnInit(): void {
  }

  getAmount = (tip: number) => {
      return tip==0 ? tip +" N" : (tip/1000000000000000000000000).toFixed(4)+ " N"
  }
}
