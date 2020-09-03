import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string; 
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnEdit: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    // get id from url
    this.id = this.route.snapshot.params['id'];
    // get client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    })
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }


  onSubmit({value, valid}:{value: Client, valid: boolean}) {
    if(!valid){
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 3000
      });
    }else{
      // Add ID to client
      value.id = this.id;
      // update the client
      this.clientService.updateClient(value);
      this.flashMessage.show('Client updated successfully', {
        cssClass: 'alert-success', timeout: 3000
      });
      this.router.navigate(['/client/'+this.id]);
    }
  }


}
