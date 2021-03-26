import { CookieService } from "ngx-cookie-service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({ templateUrl: './confirm.component.html' })
export class ConfirmComponent
{
    constructor(private router:Router, private cs:CookieService)
    {
        if(cs.get('email-reset-id') == "")
            router.navigateByUrl("/login");
    }
}