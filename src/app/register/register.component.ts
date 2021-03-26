import { trigger, state, transition, style, animate } from '@angular/animations'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { Component } from "@angular/core";
import { Router } from '@angular/router'
import { User } from '../model/user.model';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    animations: [
        trigger('tent', [
            state('open', style({
                transform: 'scaleY(1)',
                height: '42px'
            })),
            state('closed', style({
                transform: 'scaleY(0)',
                height: '0px'
            })),
            transition('open => closed', animate('0.4s ease-in-out')),
            transition('closed => open', animate('0.4s ease-in-out'))
        ]),
        trigger('smallTent', [
            state('open', style({
                transform: 'scaleY(1)',
                height: '20px'
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
export class RegisterComponent
{
    error = false;
    numberError = false;
    pwdError = false;
    errorMessage = '';
    formGroup = new FormGroup({
        username: new FormControl(''),
        email: new FormControl(''),
        number: new FormControl(''),
        pwd: new FormControl(''),
        confirm: new FormControl('')
    });

    constructor(private db:AngularFireDatabase, private router:Router, private cs:CookieService) {}

    private checkEmpty(value:string, name:string, check:boolean):boolean
    {
        if(!check || value == "")
        {
            document.getElementById(name).focus();
            document.getElementById(name + "-box").classList.add("error");
            return true;
        }

        return false;
    }

    public checkNumber():void
    {
        this.numberError = this.formGroup.value['number'] == null || ("" + this.formGroup.value["number"]).length != 10;
        if(this.numberError)
            document.getElementById("number-box").classList.add("error");
        else
            document.getElementById("number-box").classList.remove("error");
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
        let username_sub = this.formGroup.value['username'];
        let email_sub = this.formGroup.value['email'];
        let number_sub = this.formGroup.value['number'];
        let pwd_sub = this.formGroup.value['pwd'];
        let confirm_sub = this.formGroup.value['confirm'];

        this.error = false;
        document.getElementById("username-box").classList.remove("error");
        document.getElementById("email-box").classList.remove("error");
        if(!this.numberError)
            document.getElementById("number-box").classList.remove("error");
        if(!this.pwdError)
           document.getElementById("pwd-box").classList.remove("error");
        document.getElementById("confirm-box").classList.remove("error");

        if(!this.checkEmpty(username_sub, "username", true) && !this.checkEmpty(email_sub, "email", true) && !this.checkEmpty(number_sub, "number", true)
        && !this.checkEmpty(pwd_sub, "pwd", true) && !this.checkEmpty(confirm_sub, "confirm", true))
        {
            if(!email_sub.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/))
            {
                this.error = true;
                this.errorMessage = "Errore: la mail non è valida";
                this.checkEmpty(null, "email", false);
            }
            else if(pwd_sub != confirm_sub)
            {
                this.error = true;
                this.errorMessage = "Errore: le password non corrispondono";
                this.checkEmpty(null, "confirm", false);
            }
            else if(this.numberError)
                document.getElementById("number").focus();
            else if(this.pwdError)
                document.getElementById("pwd").focus();
            else
            {
                var list = this.db.list("/users") as AngularFireList<User>;
                var emailTaken = false;
                list.snapshotChanges().subscribe(res => {
                    res.forEach(u => {
                        const user = u.payload.toJSON();
                        if(user['email'] == email_sub)
                        {
                            emailTaken = true;
                            return;
                        }
                    });

                    if(!emailTaken)
                    {
                        this.db.list("/users").push({
                            email: email_sub,
                            number: number_sub,
                            pwd: pwd_sub,
                            username: username_sub
                        });
        
                        this.cs.set('username', username_sub);
                        this.router.navigateByUrl("/area");
                    }
                    else
                    {
                        this.errorMessage = "Errore: email già in uso";
                        this.error = true;
                    }
                });
            }
        }
    }
}

//richiesta per karima: personalizzare l'overflow e fare la pagina di error 404