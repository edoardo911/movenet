import { animate, state, style, transition, trigger } from "@angular/animations";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormControl, FormGroup } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { User } from "../model/user.model";

@Component({
    templateUrl: './forgot.component.html',
    animations: [
        trigger('tent', [
          state('open', style({
            transform: 'scaleY(1)',
            'margin-bottom': '26px',
            height: '24px'
          })),
          state('closed', style({
            transform: 'scaleY(0)',
            'margin-bottom': '14px',
            height: '0px'
          })),
          transition('open => closed', animate('0.4s ease-in-out')),
          transition('closed => open', animate('0.4s ease-in-out'))
        ])
      ]
})
export class ForgotComponent
{
    error = false;
    errorMessage = ''
    formGroup = new FormGroup({
        email: new FormControl('')
    });

    constructor(private db:AngularFireDatabase, private http:HttpClient, private router:Router, private cs:CookieService) {}

    onSubmit()
    {
        let sub_email = this.formGroup.value['email'];

        document.getElementById("email-box").classList.remove("error");
        this.error = false;

        if(sub_email == "")
        {
            document.getElementById("email").focus();
            document.getElementById("email-box").classList.add("error");
        }
        else if(!sub_email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/))
        {
            document.getElementById("email").focus();
            document.getElementById("email-box").classList.add("error");
            this.errorMessage = "Formato email non valido"
            this.error = true;
        }
        else
        {
            var list = this.db.list("/users") as AngularFireList<User>;
            list.snapshotChanges().subscribe(res => {
                res.forEach(u => {
                const user = u.payload.toJSON();
                if(user['email'] == sub_email)
                {
                    const id = Math.floor(Math.random() * 452389758923948) + 103948571903857;
                    this.cs.set('email-reset-id', id.toString());
                    this.cs.set('recover-email', sub_email);
                    this.http.post<string>("http://localhost:8000/sendmail/", {
                        email: sub_email,
                        id: id.toString()
                    }, {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }),
                        withCredentials: true
                    }).subscribe(err => {
                        console.log(err);
                    });
        
                    this.router.navigateByUrl("/confirm");
                    return;
                }
                });
            });

            document.getElementById("email").focus();
            document.getElementById("email-box").classList.add("error");
            this.errorMessage = "Email non registrata";
            this.error = true;
        }
    }
}