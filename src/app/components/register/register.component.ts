import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router 
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
    .then(res => {
      this.flashMessage.show('You are now registered and logged in', {
        cssClass: 'alert-success', timeout: 3000
      });
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.flashMessage.show(err.message, {
        cssClass: 'alert-danger', timeout: 3000
      });
    });
  }

}
