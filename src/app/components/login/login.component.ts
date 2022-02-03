import {Component, OnInit} from '@angular/core';
import {NearService} from "../../services/near.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public accountId: any;

  constructor(public nearService: NearService) {
  }

  ngOnInit(): void {
    this.accountId = this.nearService.wallet.getAccountId();
  }

  signIn = () => this.nearService.wallet.requestSignIn(environment.CONTRACT_ID);

  signOut = () => {
    this.nearService.wallet.signOut();
    localStorage.removeItem(`near-api-js:keystore:${this.accountId}:testnet`);
    this.accountId = this.nearService.wallet.getAccountId()
  }
}
