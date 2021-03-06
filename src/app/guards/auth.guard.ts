import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";


//this is a guard service and guards are used to protect routes from unauthorized person

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ) {}


    canActivate(): Observable<boolean> {
        return this.afAuth.authState.pipe(map(auth => {
            if(!auth){
                this.router.navigate(['/login']);
                return false;
            }else {
                return true;
            }
        }));
    }
}