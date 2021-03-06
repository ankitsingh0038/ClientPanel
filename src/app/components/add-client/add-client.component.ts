import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '', 
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean;

  @ViewChild('clientForm') form: any;
  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private clientService: ClientService,
    private settingsService: SettingsService
    ) { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(this.disableBalanceOnAdd==true){
      value.balance = 0;
    }
 
    if(!valid){
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 3000});
    }else{
      // Add new client
      this.clientService.newClient(value);
      // Show message
      this.flashMessage.show('New client added', { cssClass: 'alert-success', timeout: 3000});
      // Redirect to dashboard
      this.router.navigate(['/']);
    }
  }

}
