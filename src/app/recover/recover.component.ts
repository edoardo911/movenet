import { animate, state, style, transition, trigger } from "@angular/animations";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { User } from "../model/user.model";

@Component({
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.css'],
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
        ]),
        trigger('bigTent', [
            state('open', style({
                transform: 'scaleY(1)',
                height: '70px'
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
export class RecoverComponent implements OnInit
{
    error = false;
    outdated = false;
    pwdError = false;
    formGroup = new FormGroup({
        pwd: new FormControl(''),
        confirm: new FormControl('')
    });

    constructor(private db:AngularFireDatabase, private route:ActivatedRoute, private router:Router, private cs:CookieService) {}

    ngOnInit():void
    {
        this.route.queryParams.subscribe(params => {
            if(params['id'] == undefined)
                this.router.navigateByUrl("/login");
            else if(params['id'] != this.cs.get('email-reset-id'))
                this.outdated = true;
        });
    }

    public checkPwd():void
    {
        this.pwdError = this.formGroup.value['pwd'] == null || ("" + this.formGroup.value["pwd"]).length < 8;
        if(this.pwdError)
            document.getElementById("pwd-box").classList.add("error");
        else
            document.getElementById("pwd-box").classList.remove("error");
    }

    public onSubmit():void
    {
        let sub_pwd = this.formGroup.value['pwd'];
        let sub_confirm = this.formGroup.value['confirm'];

        if(!this.pwdError)
            document.getElementById("pwd-box").classList.remove("error");
        document.getElementById("confirm-box").classList.remove("error");
        this.error = false;

        if(sub_pwd == "")
        {
            document.getElementById("pwd").focus();
            document.getElementById("pwd-box").classList.add("error");
        }
        else if(sub_confirm == "")
        {
            document.getElementById("confirm").focus();
            document.getElementById("confirm-box").classList.add("error");
        }
        else if(this.pwdError)
            document.getElementById("pwd").focus();
        else if(sub_pwd != sub_confirm)
            this.error = true;
        else
        {
            var list = this.db.list("/users") as AngularFireList<User>;
            list.snapshotChanges().subscribe(res => {
                res.forEach(u => {
                    const user = u.payload.toJSON();
                    if(user['email'] == this.cs.get('recover-email'))
                    {
                        this.db.list("/users").set(u.key, {
                            email: user['email'],
                            number: `${user['number']}`,
                            pwd: sub_pwd,
                            username: user['username']
                        });
                        this.cs.delete("email-reset-id", "/");
                        this.cs.delete("recover-email", "/");
                        this.cs.delete("username", "/");
                        this.router.navigateByUrl("/login");
                        return;
                    }
                });
            });
        }
    }
}