import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn } from '../../router.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]':''}
})
export class LoginComponent implements OnInit {
 
  error: any;
  constructor(public af: AngularFire,private router: Router) {

    this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/app/about');
      }
    });

  }

  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        this.router.navigate(['/app/about']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  loginGit() {
    this.af.auth.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        this.router.navigate(['/app/about']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        this.router.navigate(['/app/about']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  signUp(){
    this.router.navigate(['/signup']);
  }

  loginStd(){
    this.router.navigate(['/login-email']);
  }

  ngOnInit() {
  }

}

