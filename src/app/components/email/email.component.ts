import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

    error: any;

  constructor(public af: AngularFire,private router: Router) {
    this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/members');
      }
    });
  }


  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/app/about']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  createAccount(){
    this.router.navigate(['/signup']);
  }

  goBack(){
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}