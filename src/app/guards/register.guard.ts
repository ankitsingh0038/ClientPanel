import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { map } from "rxjs/operators/map";

import { SettingsService } from '../services/settings.service';

//this is a guard service and guards are used to protect routes from unauthorized person

@Injectable()
export class RegisterGuard implements CanActivate {
    constructor(
        private router: Router,
        private settingsService: SettingsService
    ) {}


    canActivate(): boolean {
        if(this.settingsService.getSettings().allowRegisteration) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}