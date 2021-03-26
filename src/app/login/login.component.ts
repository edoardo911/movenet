import { trigger, state, transition, style, animate } from '@angular/animations'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { FormGroup, FormControl } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service'
import { User } from 'src/app/model/user.model'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  templateUrl: './login.component.html',
  animations: [
    trigger('tent', [
      state('open', style({
        transform: 'scaleY(1)',
        height: '24px'
      })),
      state('closed', style({
        transform: 'scaleY(0)',
        height: '0px'
      })),
      transition('open => closed', animate('0.4s ease-in-out')),
      transition('closed => open', animate('0.4s ease-in-out'))
    ])
  ]
})
export class LoginComponent
{
  error = false;
  formGroup = new FormGroup({
    email: new FormControl(''),
    pwd: new FormControl('')
  });

  constructor(private db:AngularFireDatabase, private router:Router, private cs:CookieService) {}

  public onSubmit():void
  {
    let sub_email = this.formGroup.value['email'];
    let sub_pwd = this.formGroup.value['pwd'];

    document.getElementById("email-box").classList.remove("error");
    document.getElementById("pwd-box").classList.remove("error");
    this.error = false;

    if(sub_email == "")
    {
      document.getElementById("email").focus();
      document.getElementById("email-box").classList.add("error");
    }
    else if(sub_pwd == "")
    {
      document.getElementById("pwd").focus();
      document.getElementById("pwd-box").classList.add("error");
    }
    else
    {
      var list = this.db.list("/users") as AngularFireList<User>;
      list.snapshotChanges().subscribe(res => {
        res.forEach(u => {
          const user = u.payload.toJSON();
          if(user['email'] == sub_email && user['pwd'] == sub_pwd)
          {
            this.cs.set('username', user['username']);
            this.router.navigateByUrl("/area");
            return;
          }
        });
      });

      this.formGroup.reset();
      this.error = true;
    }
  }
}
